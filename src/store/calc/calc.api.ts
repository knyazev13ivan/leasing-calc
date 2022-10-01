import { baseApi } from "../base.api";
import { ICalcState } from "./calc.slice";

export const calcApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<ICalcState, ICalcState>({
      query: (params) => ({
        url: "/",
        method: "POST",
        body: params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSignInMutation } = calcApi;
