const MiddenCard = ({ title, children, className = "" }) => {
  return (
    <div className={`w-full min-h-screen md:min-h-0 md:w-3/4 p-6 ${className}`}>
      {title && (
        <h2 className="text-2xl font-serif font-bold mb-4 text-white">
          {title}
        </h2>
      )}
      <div className="text-lavender font-mono">
        {children}
      </div>
    </div>
  );
};

export default MiddenCard;
