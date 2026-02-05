import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

const Header = ({ user, logout }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-darkAmethyst p-4 flex justify-between items-center shadow-md border-b-4 border-dashed border-evergreen">
      <div>
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-3xl font-serif font-bold text-white cursor-pointer hover:text-lavender transition-colors text-shadow-hard-greyOlive text-shadow-lg"
        >
          Midden
        </h1>
      </div>
      <div className="flex items-center gap-4 font-mono">
        <span className="text-lavender">
          <strong>{user.username}</strong>
        </span>
        <Button
          onClick={() => navigate("/dashboard/settings")}
          className="bg-greyOlive hover:bg-paleSlate text-onyx font-bold py-1 px-3 rounded transition-colors text-sm"
        >
          Settings
        </Button>
        <Button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="bg-greyOlive hover:bg-paleSlate text-onyx font-bold py-1 px-3 rounded transition-colors text-sm"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
