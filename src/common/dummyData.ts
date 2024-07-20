export const dummyData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const buttonOption = [
  {
    name: "TIMESCALE",
    option: [
      { label: "Seven", value: "seven" },
      { label: "Thirty", value: "thirty" },
      { label: "Seven compressed", value: "seven_compressed" },
      { label: "Thirty compressed", value: "thirty_compressed" },
    ],
  },
  {
    name: "RDS",
    option: [
      { label: "Daily", value: "DAILY" },
      { label: "Weekly", value: "WEEKLY" },
      { label: "Default", value: "DEFAULT" },
    ],
  },
];

export const currentYearRange = {
  startDate: `${new Date().getFullYear()}-01-01`,
  endDate: `${new Date().getFullYear()}-12-31`,
};


const myReducer = (state: any, action: any) => {
  switch (action.type) {
    case "INPUTDATA":
      return {
        ...state,
        inputData: {
          ...state.inputData,
          ...action.payload,
        },
      };
    case "FETCHTIME":
      return {
        ...state,
        fetchTime: action.payload,
      };
    case "STOREDATA":
      return {
        ...state,
        storeData: [...state.storeData, ...action.payload],
      };
    case "ACTIVECATEGORY":
      return {
        ...state,
        activeCategory: action.payload,
      };
    case "ACTIVECATEGORYOPTION":
      return {
        ...state,
        activeCategoryOption: action.payload,
      };
  }
};