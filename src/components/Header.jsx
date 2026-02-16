import { Button } from "@headlessui/react";
import { useNavigate, Link } from "react-router-dom";
import MobileBurgerMenu from "./MobileBurgerMenu";

const Header = ({ user, logout, title, titleLink, navLinks }) => {
  const navigate = useNavigate();
  const isGuest = user && user.username === "guest";
  const showBack = title !== "Midden";
  const hasNav = navLinks.length > 0;

  return (
    <header className="bg-primary border-accent flex items-center justify-between border-b-4 border-dashed p-4">
      <div className="flex items-center gap-4">
        {/* Mobile: Burger Menu (if links exist) */}
        <div className="md:hidden">
          {hasNav && (
            <MobileBurgerMenu showBack={showBack} navLinks={navLinks} />
          )}
        </div>

        <h1
          onClick={() => navigate(titleLink)}
          className="font-gothic hover:text-lightestGrey text-shadow-hard-grey cursor-pointer text-5xl tracking-wide text-white transition-colors text-shadow-lg"
        >
          {title}
        </h1>

        {/* Desktop: Nav Links */}
        {hasNav && (
          <nav className="ml-24 hidden items-center gap-16 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                aria-label={link.ariaLabel}
                className="hover:text-lightestGrey font-mono text-lg text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
      <div className="flex items-center gap-4 font-mono">
        <span className="hidden text-white md:block">
          <strong>{user.username}</strong>
        </span>
        {!isGuest && (
          <Button
            onClick={() => navigate("/settings")}
            aria-label="Settings"
            className="bg-grey hover:bg-lightGrey text-dark px-3 py-1 text-2xl transition-colors"
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
          className="bg-grey hover:bg-lightGrey text-dark px-3 py-1 text-2xl transition-colors"
        >
          🚪→
        </Button>
      </div>
    </header>
  );
};

export default Header;
