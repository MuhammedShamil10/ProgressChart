import { useQuery } from "@tanstack/react-query";
import { API_URLS } from "./endpoints";
import { DataQueryKey } from "./data-query-keys";
import axios from "axios";

type GetProgressPayload = {
  timeFrom: string;
  timeTo: string;
  type: string;
  tableName: string;
  inputIds: string;
  basicAuth: string;
};

export const useGetChartData = (payload: GetProgressPayload) => {
  const params = {
    timeFrom: payload.timeFrom,
    timeTo: payload.timeTo,
    type: payload.type,
    tableName: payload.tableName,
    inputIds: payload.inputIds,
    basicAuth: payload.basicAuth,
  };

  const httpClient = axios.create({
    baseURL: "https://app.stg.rhino.energy/api/",
    withCredentials: false,
    headers: {
      Authorization: `Basic ${params.basicAuth}`,
      "Content-Type": "application/json",
    },
  });

  return useQuery({
    queryKey: [DataQueryKey.progressChart],
    queryFn: async () => {
      const { data } = await httpClient.post(API_URLS.getChartData(), {
        timeFrom: `${params.timeFrom}T00:00:00`,
        timeTo: `${params.timeTo}T00:00:00`,
        source: params.type,
        tableName: params.tableName,
        inputIds: [params.inputIds],
      });
      return data;
    },
  });
};
