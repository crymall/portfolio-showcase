import MiddenCard from "../components/MiddenCard";
import AppGrid from "../components/AppGrid";

const Explorer = () => {
  const items = [
    {
      label: "Applications",
      symbol: "💻",
      to: "/applications",
    },
    {
      label: "Experiments",
      symbol: "🧪",
      to: "/experiments",
    }
  ];

  return (
    <MiddenCard>
      <AppGrid items={items} />
    </MiddenCard>
  );
};

export default Explorer;
