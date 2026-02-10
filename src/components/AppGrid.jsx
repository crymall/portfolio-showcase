import AppCard from "./AppCard";

const AppGrid = ({ items = [], small = false }) => {
  return (
    <div className="flex w-full flex-wrap gap-6">
      {items.map((item, index) => (
        <AppCard key={index} small={small} {...item} />
      ))}
    </div>
  );
};

export default AppGrid;
