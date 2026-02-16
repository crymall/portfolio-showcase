import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RecipeDetail from "../RecipeDetail";
import useData from "../../../context/data/useData";
import useAuth from "../../../context/auth/useAuth";

// Mock dependencies
vi.mock("react-router-dom", () => ({
  useParams: () => ({ id: "123" }),
}));

vi.mock("../../../context/data/useData");
vi.mock("../../../context/auth/useAuth");

// Mock UI components to simplify DOM structure
vi.mock("../../../components/MiddenCard", () => ({
  default: ({ children }) => <div data-testid="midden-card">{children}</div>,
}));

vi.mock("../../../components/gateways/Can", () => ({
  default: ({ children }) => <div data-testid="can-gate">{children}</div>,
}));

// Mock Headless UI Dialog to avoid portal issues in tests
vi.mock("@headlessui/react", async () => {
  const actual = await vi.importActual("@headlessui/react");
  return {
    ...actual,
    Dialog: ({ open, children }) => (open ? <div data-testid="dialog">{children}</div> : null),
    DialogPanel: ({ children }) => <div>{children}</div>,
  };
});

describe("RecipeDetail", () => {
  const mockGetRecipe = vi.fn();
  const mockToggleRecipeLike = vi.fn();
  const mockGetUserLists = vi.fn();
  const mockAddRecipeToList = vi.fn();

  const mockRecipe = {
    id: "123",
    title: "Test Recipe",
    author: { username: "chef_test" },
    description: "A tasty test recipe",
    prep_time_minutes: 10,
    cook_time_minutes: 20,
    servings: 4,
    ingredients: [
      { quantity: "1", unit: "cup", name: "Flour", notes: "sifted" },
    ],
    instructions: "Mix and bake.",
    likes: [],
    tags: [{ id: "1", name: "TestTag" }],
  };

  const mockUser = { id: "user1", username: "testuser" };

  const defaultContext = {
    currentRecipe: mockRecipe,
    recipesLoading: false,
    getRecipe: mockGetRecipe,
    toggleRecipeLike: mockToggleRecipeLike,
    userLists: [],
    getUserLists: mockGetUserLists,
    canteenApi: {
      addRecipeToList: mockAddRecipeToList,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useData.mockReturnValue(defaultContext);
    useAuth.mockReturnValue({ user: mockUser });
  });

  it("fetches recipe and user lists on mount", () => {
    render(<RecipeDetail />);
    expect(mockGetRecipe).toHaveBeenCalledWith("123");
    expect(mockGetUserLists).toHaveBeenCalledWith("user1");
  });

  it("renders loading state", () => {
    useData.mockReturnValue({ ...defaultContext, recipesLoading: true });
    render(<RecipeDetail />);
    expect(screen.getByText(/Loading recipe.../i)).toBeInTheDocument();
  });

  it("renders not found state", () => {
    useData.mockReturnValue({ ...defaultContext, currentRecipe: null });
    render(<RecipeDetail />);
    expect(screen.getByText(/Recipe not found/i)).toBeInTheDocument();
  });

  it("renders recipe details correctly", () => {
    render(<RecipeDetail />);
    expect(screen.getByText("Test Recipe")).toBeInTheDocument();
    expect(screen.getByText("chef_test")).toBeInTheDocument();
    expect(screen.getByText("A tasty test recipe")).toBeInTheDocument();
    expect(screen.getByText("10m")).toBeInTheDocument(); // Prep
    expect(screen.getByText("20m")).toBeInTheDocument(); // Cook
    expect(screen.getByText("4")).toBeInTheDocument(); // Servings
    expect(screen.getByText("Flour")).toBeInTheDocument();
    expect(screen.getByText("Mix and bake.")).toBeInTheDocument();
    expect(screen.getByText("TestTag")).toBeInTheDocument();
  });

  it("handles like toggle", () => {
    render(<RecipeDetail />);
    const likeBtn = screen.getByText("♡ Like");
    fireEvent.click(likeBtn);
    expect(mockToggleRecipeLike).toHaveBeenCalledWith("123", false);
  });

  it("shows liked state correctly", () => {
    const likedRecipe = {
      ...mockRecipe,
      likes: [{ user_id: "user1" }],
    };
    useData.mockReturnValue({
      ...defaultContext,
      currentRecipe: likedRecipe,
    });

    render(<RecipeDetail />);
    expect(screen.getByText("♥ Liked")).toBeInTheDocument();
  });

  it("opens add to list dialog and adds recipe", async () => {
    const mockLists = [{ id: "list1", name: "My Favorites" }];
    useData.mockReturnValue({
      ...defaultContext,
      userLists: mockLists,
    });

    render(<RecipeDetail />);

    // Open dialog
    fireEvent.click(screen.getByText("+ Add to List"));
    expect(screen.getByText("Add to List")).toBeInTheDocument();

    // Select list
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "list1" } });

    // Click Add
    const addBtn = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addBtn);

    await waitFor(() => {
      expect(mockAddRecipeToList).toHaveBeenCalledWith("list1", "123");
    });

    expect(await screen.findByText("Recipe added to list!")).toBeInTheDocument();
  });
});