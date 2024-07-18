import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "./endpoints";
import { DataQueryKey } from "./data-query-keys";
import axios from "axios";

type GetProgressPayload = {
  timeFrom: string;
  timeTo: string;
  type: string;
  DAILY: string;
  measurementUuids: string;
  basicAuth: string;
};

export const useGetChartData = (payload: GetProgressPayload) => {
  const params = {
    timeFrom: payload.timeFrom,
    timeTo: payload.timeTo,
    type: payload.type,
    DAILY: payload.DAILY,
    UUID: payload.measurementUuids,
    basicAuth: payload.basicAuth,
  };

  console.log("basicAuth", params.basicAuth);

  const httpClient = axios.create({
    baseURL: "https://app.stg.rhino.energy/api/",
    withCredentials: false,
    headers: {
      Authorization: `Basic ${params.basicAuth}`,
      "Content-Type": "application/json",
    },
  });

  return useQuery({
    queryKey: [DataQueryKey],
    queryFn: async () => {
      const { data } = await httpClient.post(API_URLS.getChartData(), {
        timeFrom: `${params.timeFrom}T00:00:00`,
        timeTo: `${params.timeTo}T00:00:00`,
        source: params.type,
        tableName: `INPUT_VALUE_${params.DAILY}`,
        measurementUuids: [params.UUID],
      });
      return data;
    },
  });
};
