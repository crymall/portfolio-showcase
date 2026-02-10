import { Link } from "react-router-dom";
import MiddenCard from "../components/MiddenCard";

const NotFound = () => {
  return (
    <MiddenCard>
      <div className="flex flex-col items-center gap-6 text-center mt-4">
        <h2 className="text-8xl font-gothic font-bold mb-4 text-white">404</h2>
        <p className="text-xl text-center">
          The page you are looking for does not exist in this pile.
        </p>
        <Link
          to="/"
          className="text-lavender underline hover:text-white text-lg"
        >
          Return to Midden
        </Link>
      </div>
    </MiddenCard>
  );
};

export default NotFound;