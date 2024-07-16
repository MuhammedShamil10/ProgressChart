import { useQuery } from "@tanstack/react-query";
import { httpClient } from "./httpClient";
import { API_URLS } from "./endpoints";
import { DataQueryKey } from "./data-query-keys";

type GetProgressPayload = {
  fromDate: string;
  toDate: string;
};

export const useGetChartData = (payload: GetProgressPayload) => {
  const params = {
    "from-date": payload.fromDate || null,
    "to-date": payload.toDate || null,
  };
  return useQuery({
    queryKey: [DataQueryKey],
    queryFn: async () => {
      const { data } = await httpClient.get(API_URLS.getChartData(), {
        params,
      });
      return data;
    },
  });
};
