import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://eoj3r7f3r4ef6v4.m.pipedream.net",
  }),
  endpoints: () => ({}),
});
