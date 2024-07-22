export type DateRange = {
  fromDate: string;
  toDate: string;
};

export type InputData = {
  name: string;
  password: string;
  inputId: string;
  timeFrom: string;
  timeTo: string;
  RDS: string;
  tableName: string;
  time: string
}[];

export type UserInput = {
  name: string;
  password: string;
  inputIds: string;
  timeFrom: string;
  timeTo: string;
  type: string;
  tableName: string;
  basicAuth: string;
}
