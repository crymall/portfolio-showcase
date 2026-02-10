import MiddenCard from "../components/MiddenCard";
import AppGrid from "../components/AppGrid";

const Applications = () => {
  return (
    <MiddenCard>
      <AppGrid items={[
        {
          label: "Back",
          symbol: "⬅️",
          to: "/",
        }
      ]} />
    </MiddenCard>
  );
};

export default Applications;