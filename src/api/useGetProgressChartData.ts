import { useQuery } from "@tanstack/react-query";
import { httpClient } from "./httpClient";
import { API_URLS } from "./endpoints";
import { DataQueryKey } from "./data-query-keys";

type GetProgressPayload = {
  timeFrom: string;
  timeTo: string;
  RDS: string;
  DAILY: string;
};

export const useGetChartData = (payload: GetProgressPayload) => {
  const params = {
    timeFrom: payload.timeFrom,
    timeTo: payload.timeTo,
    RDS: payload.RDS,
    DAILY: payload.DAILY,
  };
  return useQuery({
    queryKey: [DataQueryKey],
    queryFn: async () => {
      const { data } = await httpClient.post(API_URLS.getChartData(), {
        // timeFrom: "2023-07-02T18:30:00",
        // timeTo: "2023-08-02T18:30:00",
        // source: "RDS",
        // tableName: "INPUT_VALUE_DAILY",
        timeFrom: `${params.timeFrom}T00:00:00`,
        timeTo: `${params.timeTo}T00:00:00`,
        source: params.RDS,
        tableName: `INPUT_VALUE_${params.DAILY}`,
        measurementUuids: ["c4055774-c6c2-46bc-b64e-c946160a146e"],
      });
      return data;
    },
  });
};
