import { Link } from "react-router-dom";
import clsx from "clsx";

const AppCard = ({ to, symbol, label, small = false, description }) => {
  const isExternal = to.startsWith("http");
  const className = clsx(
    "relative group aspect-square text-white flex flex-col items-center hover:bg-opacity-90 transition-all hover:z-50",
    small ? "w-36" : "w-36 sm:w-56 md:w-64",
  );

  const content = (
    <>
      <div className="flex flex-1 items-end justify-center pb-2">
        <span
          className={small ? "text-3xl" : "text-3xl sm:text-5xl md:text-6xl"}
        >
          {symbol}
        </span>
      </div>
      <div className="flex flex-1 items-start justify-center px-2 pt-2">
        <span
          className={clsx(
            "text-center leading-tight tracking-wider",
            small
              ? "text-md"
              : "text-md sm:font-gothic sm:text-3xl md:text-4xl",
          )}
        >
          {label}
        </span>
      </div>
      {description && (
        <div className="bg-paleSlate border-evergreen pointer-events-none absolute top-2 left-1 z-50 w-[220%] -translate-x-4 border-4 border-dashed p-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <p className="text-md text-onyx text-left font-mono">{description}</p>
        </div>
      )}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={to}
        className={className}
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={to} className={className} aria-label={label}>
      {content}
    </Link>
  );
};

export default AppCard;
