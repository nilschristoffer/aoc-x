import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiLeaderboard } from "./apiType";

export const api = createApi({
  reducerPath: "statsApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://adventofcode.com/2023/leaderboard/private/view/624731.json",
  }),
  endpoints: (builder) => ({
    getStats: builder.query<ApiLeaderboard, void>({
      query: () => "",
    }),
  }),
});

export const { useGetStatsQuery } = api;
