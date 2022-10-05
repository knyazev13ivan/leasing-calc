import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hookb.in/eK160jgYJ6UlaRPldJ1P",
  }),
  endpoints: () => ({}),
});
