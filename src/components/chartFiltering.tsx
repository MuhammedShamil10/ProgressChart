import Button from "@mui/material/Button";
import { useState } from "react";
type ChartFilterProp = {
  label: string;
};
export const ChartFilter = ({ label }: ChartFilterProp) => {
  const [focusButton, setFocusButton] = useState(false);
  const [focusButtons, setFocusButtons] = useState(false);

  const handleButtonFocus = (label: string) => {
    if (label === "RDS" || label === "TIMESCALE") {
      setFocusButton(true);
    }
    if (label === "DAILY" || label === "WEEKLY") {
      setFocusButtons(true);
    }
  };
  return (
    <div>
      <Button
        variant="text"
        onClick={() => handleButtonFocus(label)}
        className={
          focusButton === true
            ? "text-black focus:border-black"
            : "" && focusButtons === true
            ? "text-black"
            : ""
        }
      >
        {label}
      </Button>
    </div>
  );
};
