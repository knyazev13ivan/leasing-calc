import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ICalcState {
  [key: string]: number;
}

export interface IConfig {
  [key: string]: {
    min: number;
    max: number;
  };
}

export interface IInputResponse {
  name: string;
  value: string | number;
}

export const config: IConfig = {
  carCost: {
    min: 1000000,
    max: 6000000,
  },
  initialDeposit: {
    min: 100000,
    max: 6000000,
  },
  percentDeposit: {
    min: 10,
    max: 60,
  },
  months: {
    min: 1,
    max: 60,
  },
};

const initialState: ICalcState = {
  carCost: 3300000,
  initialDeposit: 495000,
  months: 60,
  dealSum: 7241940,
  monthlyPayment: 112449,
  percentDeposit: 15,
  rate: 0.035,
};

const slice = createSlice({
  name: "calc",
  initialState,
  reducers: {
    change: (
      state,
      { payload: { name, value } }: PayloadAction<IInputResponse>
    ) => {
      if (typeof value === "string") value = value.replace(/\D/g, "");

      if (+value || value === "") {
        state[name] = +value;

        if (name === "initialDeposit") {
          state.percentDeposit =
            Math.round(state.initialDeposit / state.carCost) * 100;
        }
        if (name === "percentDeposit") {
          state.initialDeposit = Math.round(
            (state.percentDeposit / 100) * state.carCost
          );
        }
      }
    },
    validate: (
      state,
      { payload: { name, value } }: PayloadAction<IInputResponse>
    ) => {
      if (typeof value === "string") value = value.replace(/\D/g, "");

      if (+value === 0) state[name] = 1;
      if (+value) {
        if (+value < config[name].min) state[name] = config[name].min;
        if (+value > config[name].max) state[name] = config[name].max;
        if (+value > config[name].min && +value < config[name].max) {
          state[name] = +value;
        }
      }

      if (name === "initialDeposit") {
        const minID = Math.round(
          (state.carCost * config.percentDeposit.min) / 100
        );
        const maxID = Math.round(
          (state.carCost * config.percentDeposit.max) / 100
        );

        if (+value) {
          if (+value < minID) state[name] = minID;
          if (+value > maxID) state[name] = maxID;
        }
      }
    },
    calculate: (
      state,
      { payload: { name } }: PayloadAction<IInputResponse>
    ) => {
      if (name === "carCost") {
        state.initialDeposit = Math.round(
          (state.percentDeposit / 100) * state.carCost
        );
      }
      if (name === "initialDeposit") {
        state.percentDeposit = Math.round(
          (state.initialDeposit / state.carCost) * 100
        );
      }
      if (name === "percentDeposit") {
        state.initialDeposit = Math.round(
          (state.percentDeposit / 100) * state.carCost
        );
      }

      state.monthlyPayment = Math.round(
        (state.carCost - state.initialDeposit) *
          ((state.rate * Math.pow(1 + state.rate, state.months)) /
            (Math.pow(1 + state.rate, state.months) - 1))
      );
      state.dealSum = Math.round(
        state.initialDeposit + state.months * state.monthlyPayment
      );
    },
  },
});

export const { calculate, validate, change } = slice.actions;

export default slice.reducer;
