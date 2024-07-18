import { SwitchChart } from "../components/switchChart";
import { InputData, DateRange as TDateRange } from "../type";
import { useState } from "react";
import { currentYearRange } from "../common/dummyData";
import { ChartFilterButton } from "../components/chartFiltering";
import { UserLogin } from "../components/userInputField";
import { Button } from "@mui/material";
import { useGetChartData } from "../api/useGetProgressChartData";
import { ApiResponseTimeTable } from "../components/responseTimeApi";

export const ProgressChart = () => {
  const [activeLabel1, setActiveLabel1] = useState<string>("");
  const [activeLabel2, setActiveLabel2] = useState<string>("");
  const [fetchTime, setFetchTime] = useState("");

  const chartDataList = ["TIMESCALE", "RDS"];
  const dayFilterItem = ["DAILY", "WEEKLY"];

  const [inputData, setInputData] = useState({
    name: "",
    password: "",
    measurementUuids: "",
    timeFrom: currentYearRange.startDate,
    timeTo: currentYearRange.endDate,
    type: "",
    DAILY: "",
    basicAuth: "",
  });

  const concatenatedString = `${inputData.name}:${inputData.password}`;
  const encodedString = btoa(concatenatedString);

  const basicAuth = () => {
    setInputData({
      ...inputData,
      basicAuth: encodedString,
    });
  };

  const [storeData, setStoreData] = useState<InputData>();

  const { data, refetch } = useGetChartData(inputData);

  const handleDateChange = (data: any) => {
    setInputData({ ...inputData, ...data });
  };

  const handleActiveButton = (label: string) => {
    setActiveLabel1(label);
    setInputData({ ...inputData, type: label });
  };

  const handleActiveButton2 = (label: string) => {
    setActiveLabel2(label);
    setInputData({ ...inputData, DAILY: label });
  };

  const handleApiResponseTimeData = (timeTaken: string) => {
    setStoreData((prevStoreData = []) => [
      ...prevStoreData,
      {
        name: inputData.name,
        password: inputData.password,
        uuId: inputData.measurementUuids,
        timeFrom: inputData.timeFrom,
        timeTo: inputData.timeTo,
        RDS: inputData.type,
        DAILY: inputData.DAILY,
        time: timeTaken,
      },
    ]);
  };

  const formHandle = async () => {
    basicAuth();
    const startTime = performance.now();
    await refetch();
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    let trimNumber = timeTaken.toFixed(2);
    setFetchTime(trimNumber);
    handleApiResponseTimeData(trimNumber);
  };

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
            !inputData.measurementUuids ||
            !inputData.password
          }
          className="h-12"
          variant="contained"
          onClick={formHandle}
        >
          Submit
        </Button>
      </div>
      <SwitchChart refetch={refetch} data={data} />
      <ApiResponseTimeTable storeData={storeData} />
    </div>
  );
};
