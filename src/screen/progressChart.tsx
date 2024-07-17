import { SwitchChart } from "../components/switchChart";
import { DateRange } from "../components/datePicker";
import { DateRange as TDateRange } from "../type";
import { useEffect, useState } from "react";
import { currentYearRange } from "../common/dummyData";
import { ChartFilterButton } from "../components/chartFiltering";
import { UserLogin } from "../components/userInputField";
import { Button } from "@mui/material";
import { useGetChartData } from "../api/useGetProgressChartData";

export const ProgressChart = () => {
  const [activeLabel1, setActiveLabel1] = useState<string>("");
  const [activeLabel2, setActiveLabel2] = useState<string>("");
  const [fetchTime, setFetchTime] = useState(0);
  //   const [dateRange, setDateRange] = useState<TDateRange>({
  //     fromDate: currentYearRange.startDate,
  //     toDate: currentYearRange.endDate,
  //   });

  const [inputData, setInputData] = useState({
    name: "",
    password: "",
    uuId: "",
    timeFrom: currentYearRange.startDate,
    timeTo: currentYearRange.endDate,
    RDS: "",
    DAILY: "",
  });

  const { data, refetch } = useGetChartData(inputData);

  const handleDateChange = (data: any) => {
    setInputData({ ...inputData, ...data });
  };

  const handleActiveButton = (label: string) => {
    setActiveLabel1(label);
    setInputData({ ...inputData, RDS: label });
  };

  const handleActiveButton2 = (label: string) => {
    setActiveLabel2(label);
    setInputData({ ...inputData, DAILY: label });
  };

  const formHandle = () => {
    const startTime = performance.now();
    refetch();
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    setFetchTime(timeTaken);
  };

  console.log(inputData, "inputDataHome");

  const chartDataList = ["TIMESCALE", "RDS"];
  const dayFilterItem = ["DAILY", "WEEKLY"];

  return (
    <div className="flex flex-col items-center justify-center pt-5">
      <div className="flex flex-col items-center gap-4 border border-gray-200 p-4 rounded-md">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <UserLogin
            inputData={inputData}
            setInputData={setInputData}
            dateRange={{
              fromData: inputData.timeFrom,
              toDate: inputData.timeTo,
            }}
            handleDateChange={handleDateChange}
          />
          <div className="flex flex-wrap gap-5">
            <div className="border p-2 flex flex-row gap-4 rounded-lg border-gray-200">
              {chartDataList.map((label) => (
                <ChartFilterButton
                  key={label}
                  isActive={activeLabel1 === label}
                  onClick={handleActiveButton}
                  label={label}
                />
              ))}
            </div>
            <div className="border p-2 flex flex-row gap-4 rounded-lg border-gray-200">
              {dayFilterItem.map((label) => (
                <ChartFilterButton
                  key={label}
                  isActive={activeLabel2 === label}
                  onClick={handleActiveButton2}
                  label={label}
                />
              ))}
            </div>
          </div>
        </div>

        <Button
          disabled={
            !inputData.name ||
            !inputData.timeFrom ||
            !inputData.timeTo ||
            !inputData.uuId ||
            !inputData.password
          }
          className="h-12"
          variant="contained"
          onClick={formHandle}
        >
          Submit
        </Button>
        {fetchTime}
      </div>
      <SwitchChart refetch={refetch} data={data} />
    </div>
  );
};
