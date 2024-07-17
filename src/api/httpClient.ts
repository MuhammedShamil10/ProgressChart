import axios from "axios";
export const httpClient = axios.create({
  baseURL: "https://app.stg.rhino.energy/api/",
  withCredentials: false,
  headers: {
    Authorization: `Basic dGVzdDpUYzJGbmEzZnM1YW5talF1a1A5UzQ0TTg3bm0zVGVaMw==`,
    'Content-Type': 'application/json'
  },
});
