import { DateRange } from "./datePicker";
import { DateRange as TDateRange } from "../type";

type InputProp = {
  dateRange: any;
  inputData: {
    name: string;
    password: string;
    uuId: string;
    timeFrom: string;
    timeTo: string;
    RDS: string;
    DAILY: string;
  };
  handleDateChange: (
    data: any
  ) => void;
  setInputData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      password: string;
      uuId: string;
      timeFrom: string;
      timeTo: string;
      RDS: string;
      DAILY: string;
    }>
  >;
};
export const UserLogin = ({
  dateRange,
  inputData,
  setInputData,
  handleDateChange,
}: InputProp) => {
//   console.log(inputData, "dateRange");

  return (
    <>
      <div className="flex flex-row justify-center items-center gap-4 p-4 w-full">
        <div className="flex flex-row items-center gap-2">
          <label className="whitespace-nowrap" htmlFor="">
            User name:{" "}
          </label>
          <input
            type="text"
            placeholder="User name"
            className="border p-2"
            onChange={(e) =>
              setInputData({ ...inputData, name: e.target.value })
            }
          />
        </div>
        <div className="flex flex-row items-center gap-2 pl-2">
          <label htmlFor="">Password: </label>
          <input
            type="password"
            placeholder="Password"
            className="border p-2"
            onChange={(e) =>
              setInputData({ ...inputData, password: e.target.value })
            }
          />
        </div>

        <div className="flex flex-row items-center gap-2 pl-2">
          <label htmlFor="">UUID: </label>
          <input
            type="text"
            placeholder="Enter UUID"
            className="border p-2"
            onChange={(e) =>
              setInputData({ ...inputData, uuId: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-20">
        <DateRange range={dateRange} onChange={handleDateChange} />
      </div>
    </>
  );
};