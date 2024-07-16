import { useState } from "react";
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
import { data } from "../common/dummyData";
import { Button, ButtonGroup } from "@mui/material";

export const SwitchChart = () => {
  const [switchChart, setSwitchChart] = useState(false);

  const handleBarChart = () => {
    setSwitchChart(true);
  };
  const handleLineChart = () => {
    setSwitchChart(false);
  };

  return (
    <div className="flex flex-col justify-center items-center pt-5">
      <div>
        {switchChart === true ? (
          <BarChart width={1350} height={600} data={data}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="uv" fill="#8884d8" barSize={30} />
          </BarChart>
        ) : (
          <LineChart
            width={1350}
            height={600}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        )}
      </div>
      <div className="pt-5 pr-5 w-full flex items-end justify-end">
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Button className="border px-2 py-1 w-16" onClick={handleLineChart}>
            Line
          </Button>
          <Button className="border px-2 py-1 w-16" onClick={handleBarChart}>
            Bar
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};