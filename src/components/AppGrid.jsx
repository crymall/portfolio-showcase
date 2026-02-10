import AppCard from "./AppCard";

const AppGrid = ({ items = [], small = false }) => {
  return (
    <div className="flex flex-wrap gap-6 w-full">
      {items.map((item, index) => (
        <AppCard key={index} small={small} {...item} />
      ))}
    </div>
  );
};

export default AppGrid;
