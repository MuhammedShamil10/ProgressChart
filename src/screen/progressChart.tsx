import { SwitchChart } from "../components/switchChart";
import { InputData, DateRange as TDateRange } from "../type";
import { useEffect, useState } from "react";
import { buttonOption, currentYearRange } from "../common/dummyData";
import { ChartFilterButton } from "../components/chartFiltering";
import { UserLogin } from "../components/userInputField";
import { Button } from "@mui/material";
import { usePostChartData } from "../api/useGetProgressChartData";
import { ApiResponseTimeTable } from "../components/responseTimeApi";

export const ProgressChart = () => {
  const [fetchTime, setFetchTime] = useState("");

  const [inputData, setInputData] = useState({
    name: "",
    password: "",
    inputIds: "",
    timeFrom: currentYearRange.startDate,
    timeTo: currentYearRange.endDate,
    type: "",
    tableName: "",
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

  const { mutateAsync: postChartData, isPending } = usePostChartData(
    inputData.basicAuth
  );
  const [chartData, setChartData] = useState();

  const [activeCategory, setActiveCategory] = useState("");
  const [activeCategoryOption, setActiveCategoryOption] = useState("");

  const handleDateChange = (data: any) => {
    setInputData({ ...inputData, ...data });
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  const handleActiveButton = (value: string, source: string) => {
    setInputData({
      ...inputData,
      tableName: value,
      type: source,
    });
    setActiveCategoryOption(value);
  };

  const handleApiResponseTimeData = (timeTaken: string) => {
    setStoreData((prevStoreData = []) => [
      ...prevStoreData,
      {
        name: inputData.name,
        password: inputData.password,
        inputId: inputData.inputIds,
        timeFrom: inputData.timeFrom,
        timeTo: inputData.timeTo,
        RDS: inputData.type,
        tableName: inputData.tableName,
        time: timeTaken,
      },
    ]);
  };

  const formHandle = async () => {
    basicAuth();
    const startTime = performance.now();
    await postChartData(inputData, {
      onSuccess: (res: any) => {
        setChartData(res);
      },
    });
    const endTime = performance.now();
    const timeTaken = endTime - startTime;
    let trimNumber = timeTaken.toFixed(2);
    setFetchTime(trimNumber);
    handleApiResponseTimeData(trimNumber);
  };

  console.log("inputData", inputData);

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
              {buttonOption.map((group) => (
                <ChartFilterButton
                  key={group.name}
                  isActive={activeCategory === group.name}
                  onClick={() => handleCategoryClick(group.name)}
                  label={group.name}
                />
              ))}
            </div>
            {activeCategory && (
              <div className="flex flex-row items-center gap-3">
                <span>:</span>
                <div className="border p-2 flex flex-row gap-4 rounded-lg border-gray-200">
                  {buttonOption
                    .find((group) => group.name === activeCategory)
                    ?.option?.map((option) => (
                      <ChartFilterButton
                        key={option.value}
                        isActive={activeCategoryOption === option.value}
                        onClick={() =>
                          handleActiveButton(option.value, activeCategory)
                        }
                        label={option.label}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <Button
          disabled={
            !inputData.name ||
            !inputData.timeFrom ||
            !inputData.timeTo ||
            !inputData.inputIds ||
            !inputData.password ||
            !inputData.tableName
          }
          className="h-12"
          variant="contained"
          onClick={formHandle}
        >
          Submit
          {isPending && <div className="loader"></div>}
        </Button>
      </div>
      <div className="flex flex-row justify-center items-center pr-2">
        <SwitchChart data={chartData} />
        <ApiResponseTimeTable storeData={storeData} />
      </div>
    </div>
  );
};
