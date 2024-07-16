import { DateRange as TDateRange } from "../type";

type DateRangeProps = {
  range: TDateRange;
  onChange: (
    key: keyof TDateRange,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

export const DateRange = ({ range, onChange }: DateRangeProps) => {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex gap-2 items-center p-2.5 border border-gray-200 rounded-lg text-sm font-semibold leading-6 ">
        <span className="text-gray-500">From :</span>
        <input
          type="date"
          name="date-filter"
          id="from-date"
          value={range.fromDate}
          onChange={(event) => onChange("fromDate", event)}
          className="border-0 focus:ring-0 p-0 text-gray-900"
        />
      </div>
      <div className="flex gap-2 items-center p-2.5 border border-gray-200 rounded-lg text-sm font-semibold leading-6">
        <span className="text-gray-500">To :</span>
        <input
          type="date"
          name="date-filter"
          id="to-date"
          value={range.toDate}
          onChange={(event) => onChange("toDate", event)}
          className="border-0 focus:ring-0 p-0 text-gray-900"
        />
      </div>
    </div>
  );
};
