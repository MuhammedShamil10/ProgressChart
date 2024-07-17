type ChartFilterProp = {
  label: string;
  isActive: boolean;
  onClick: (label: string) => void;
};

export const ChartFilterButton = ({ label, isActive, onClick }: ChartFilterProp) => {
  return (
    <div>
      <button
        onClick={() => onClick(label)}
        className={
          isActive
            ? "text-red-800 text-sm border rounded-sm p-2"
            : "text-sm border rounded-sm p-2"
        }
      >
        {label}
      </button>
    </div>
  );
};
