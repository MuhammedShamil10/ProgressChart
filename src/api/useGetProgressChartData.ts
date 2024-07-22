import { useMutation } from "@tanstack/react-query";
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

export const usePostChartData = (basicAuth: string) => {
  const httpClient = axios.create({
    baseURL: "https://app.stg.rhino.energy/api/",
    withCredentials: false,
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/json",
    },
  });

  return useMutation({
    mutationKey: [DataQueryKey.progressChart],
    mutationFn: async (payload: GetProgressPayload) => {
      const result = await httpClient.post(API_URLS.getChartData(), {
        timeFrom: `${payload.timeFrom}T00:00:00`,
        timeTo: `${payload.timeTo}T00:00:00`,
        source: payload.type,
        tableName: payload.tableName,
        inputIds: [payload.inputIds],
      });
      return result;
    },
  });
};
