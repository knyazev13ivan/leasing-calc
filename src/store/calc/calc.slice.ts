import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ICalcState {
  [key: string]: number;
}

export interface IConfig {
  carCost: {
    min: number;
    max: number;
  };
  percentDeposit: {
    min: number;
    max: number;
  };
  months: {
    min: number;
    max: number;
  };
  rate: number;
}

export interface IInputResponse {
  name: keyof ICalcState;
  value: string;
}

const config: IConfig = {
  carCost: {
    min: 1000000,
    max: 6000000,
  },
  percentDeposit: {
    min: 0.1,
    max: 0.6,
  },
  months: {
    min: 1,
    max: 60,
  },
  rate: 0.035,
};

const initialState: ICalcState = {
  set carCost(value) {
    if (value < config.carCost.min) this.carCost = config.carCost.min;
    if (value > config.carCost.max) this.carCost = config.carCost.max;
    if (value > config.carCost.min && value < config.carCost.max) {
      this.carCost = +value;
    }
  },
  get carCost() {
    return this.carCost || 3300000;
  },
  set initialDeposit(value) {
    this.initialDeposit = (this.percentDeposit / 100) * this.carCost;
  },
  get initialDeposit() {
    return this.initialDeposit || 420000;
  },
  set months(value) {
    if (value < config.months.min) this.months = config.months.min;
    if (value > config.months.max) this.months = config.months.max;
    if (value > config.months.min && value < config.months.max) {
      this.months = +value;
    }
  },
  get months() {
    return this.months || 60;
  },
  set percentDeposit(value) {
    if (value / 100 < config.percentDeposit.min)
      this.percentDeposit = config.percentDeposit.min;
    if (value / 100 > config.percentDeposit.max)
      this.percentDeposit = config.percentDeposit.max;
    if (
      value > config.percentDeposit.min &&
      value < config.percentDeposit.max
    ) {
      this.percentDeposit = +value / 100;
    }
  },
  get percentDeposit() {
    return this.percentDeposit || 0.1;
  },
  dealSum: 4467313,
  monthlyPayment: 114455,
};

const slice = createSlice({
  name: "calc",
  initialState,
  reducers: {
    calc: (
      state,
      { payload: { name, value } }: PayloadAction<IInputResponse>
    ) => {
      state[name] = +value;

      if (name === "initialDeposit") {
        state.percentDeposit =
          Math.round((state.initialDeposit / state.carCost) * 100) / 100;
      }
      if (name === "percentDeposit") {
        state.initialDeposit = Math.round(state.percentDeposit * state.carCost);
      }

      state.monthlyPayment = Math.round(
        (state.carCost - state.initialDeposit) *
          ((config.rate * Math.pow(1 + config.rate, state.months)) /
            (Math.pow(1 + config.rate, state.months) - 1))
      );
      state.dealSum = Math.round(
        state.initialDeposit + state.months * state.monthlyPayment
      );
    },
    // calcInitialDeposit: (state) => {
    //   state.initialDeposit = state.percentDeposit * state.carCost;
    // },
    // calcDealSum: (state) => {
    //   state.dealSum =
    //     state.initialDeposit + state.months * state.monthlyPayment;
    // },
    // calcMonthlyPayment: (state) => {
    //   state.initialDeposit = state.percentDeposit * state.carCost;
    // },
  },
});

export const { calc } = slice.actions;

export default slice.reducer;
