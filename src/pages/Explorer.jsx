import MiddenCard from "../components/MiddenCard";

const Explorer = () => {
  const items = [
    "Old Tire",
    "Broken Toaster",
    "Rusty Can",
    "Banana Peel",
    "Discarded Pizza Box",
  ];

  return (
    <MiddenCard title="Midden">
      <ul className="list-disc list-inside space-y-2">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </MiddenCard>
  );
};

export default Explorer;
