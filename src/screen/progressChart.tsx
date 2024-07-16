import { SwitchChart } from "../components/switchChart";
import { DateRange } from "../components/datePicker";
import { DateRange as TDateRange } from "../type";
import { useState } from "react";
import { currentYearRange } from "../common/dummyData";
import { ChartFilter } from "../components/chartFiltering";

export const ProgressChart = () => {
  const [dateRange, setDateRange] = useState<TDateRange>({
    fromDate: currentYearRange.startDate,
    toDate: currentYearRange.endDate,
  });

  const handleDateChange = (
    key: keyof TDateRange,
    event: React.ChangeEvent<HTMLInputElement>
  ) => setDateRange({ ...dateRange, [key]: event.target.value });

  return (
    <div className="flex flex-col items-center justify-center pt-5 h-screen">
      <div className="flex items-center justify-between gap-20">
        <DateRange range={dateRange} onChange={handleDateChange} />
        <div className="flex flex-wrap gap-5">
          <div className="border p-2 flex flex-row gap-4 rounded-lg border-gray-200">
            <ChartFilter label="TIMESCALE" />
            <ChartFilter label="RDS" />
          </div>
          <div className="border p-2 flex flex-row gap-4 rounded-lg border-gray-200">
            <ChartFilter label="DAILY" />
            <ChartFilter label="WEEKLY" />
          </div>
        </div>
      </div>
      <SwitchChart />
    </div>
  );
};
