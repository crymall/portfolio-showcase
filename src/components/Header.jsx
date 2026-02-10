import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const Header = ({ user, logout }) => {
  const navigate = useNavigate();
  const isGuest = user && user.username === "guest";

  return (
    <header className="bg-darkAmethyst border-evergreen flex items-center justify-between border-b-4 border-dashed p-4">
      <div>
        <h1
          onClick={() => navigate("/")}
          className="font-gothic hover:text-lavender text-shadow-hard-greyOlive cursor-pointer text-5xl tracking-wide text-white transition-colors text-shadow-lg"
        >
          Midden
        </h1>
      </div>
      <div className="flex items-center gap-4 font-mono">
        <span className="text-lavender hidden md:block">
          <strong>{user.username}</strong>
        </span>
        {!isGuest && (
          <Button
            onClick={() => navigate("/settings")}
            aria-label="Settings"
            className="bg-greyOlive hover:bg-paleSlate text-onyx px-3 py-1 text-2xl transition-colors"
          >
            🛠
          </Button>
        )}
        <Button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          aria-label="Logout"
          className="bg-greyOlive hover:bg-paleSlate text-onyx px-3 py-1 text-2xl transition-colors"
        >
          🚪→
        </Button>
      </div>
    </header>
  );
};

export default Header;
