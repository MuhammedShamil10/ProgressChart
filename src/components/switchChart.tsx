import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button, ButtonGroup } from "@mui/material";

export const SwitchChart = ({ data }: any) => {
  
  const [switchChart, setSwitchChart] = useState(false);
  const [chartData, setChartData] = useState([]);
  

  const transformData = (data: any) => {
    return data?.map(
      (item: { readTime: string | number | Date; value: any }) => ({
        name: new Date(item.readTime).toLocaleDateString(),
        value: item?.value,
      })
    );
  };

  useEffect(() => {
    if (data?.data) {
      setChartData(transformData(data?.data));
    }
  }, [data]);

  const handleBarChart = () => {
    setSwitchChart(true);
  };
  const handleLineChart = () => {
    setSwitchChart(false);
  };
  const width = window.innerWidth;
  return (
    <div>
      {chartData?.length  ? (
        <div className="flex flex-col justify-center items-center pt-5">
          <div className="px-5">
            {switchChart === true ? (
              <BarChart width={width - 500} height={600} data={chartData}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip itemStyle={{ width: "100%" }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="value" fill="#8884d8" barSize={30} />
              </BarChart>
            ) : (
              <LineChart
                width={width -500}
                height={600}
                data={chartData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip itemStyle={{ width: "100%" }} />
              </LineChart>
            )}
          </div>
          <div className="pt-5 pr-5 w-full flex items-end justify-center">
            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button
                className="border px-2 py-1 w-16"
                onClick={handleLineChart}
              >
                Line
              </Button>
              <Button
                className="border px-2 py-1 w-16"
                onClick={handleBarChart}
              >
                Bar
              </Button>
            </ButtonGroup>
          </div>
        </div>
      ) : (
        <div className="pt-16">
          <span className="">No data</span>
        </div>
      )}
    </div>
  );
};
