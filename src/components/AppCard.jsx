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
      <div className="flex-1 flex items-end justify-center pb-2">
        <span
          className={small ? "text-3xl" : "text-3xl sm:text-5xl md:text-6xl"}
        >
          {symbol}
        </span>
      </div>
      <div className="flex-1 flex items-start justify-center pt-2 px-2">
        <span
          className={clsx(
            "tracking-wider text-center leading-tight",
            small
              ? "text-md"
              : "text-md sm:text-3xl md:text-4xl sm:font-gothic",
          )}
        >
          {label}
        </span>
      </div>
      {description && (
        <div className="absolute top-2 left-1 w-[220%] p-4 bg-paleSlate border-4 border-dashed border-evergreen opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none z-50">
          <p className="text-md font-mono text-onyx text-left">{description}</p>
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
