import { baseApi } from "../base.api";
import { ICalcState } from "./calc.slice";

export const calcApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    submitLeasingForm: build.mutation<string, string | ICalcState>({
      query: (params) => ({
        url: "",
        method: "POST",
        body: params,
        headers: {
          'content-type': 'application/json',
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSubmitLeasingFormMutation } = calcApi;
