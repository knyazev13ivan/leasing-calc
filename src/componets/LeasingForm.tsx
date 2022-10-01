import React from "react";
import { useSubmitLeasingFormMutation } from "../store/calc/calc.api";
import { useAppSelector } from "../store/hooks";
import InfoField from "./common/InfoField";
import InputField from "./common/InputField";
import PercentDeposit from "./common/PercentDeposit";
import SubmitButton from "./SubmitButton";

const LeasingForm: React.FC = () => {
  const state = useAppSelector((state) => state.calc);

  const [submitLeasingForm, { isLoading, error }] =
    useSubmitLeasingFormMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await submitLeasingForm(state);
  };

  return (
    <div className="leasing-form">
      <h1 className="leasing-form__caption">
        Рассчитайте стоимость автомобиля в лизинг
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="leasing-form__inputs">
          <InputField
            caption="Стоимость автомобиля"
            name="carCost"
            value={state.carCost}
          >
            ₽
          </InputField>

          <InputField
            caption="Первоначальный взнос"
            name="initialDeposit"
            value={state.initialDeposit}
          >
            <PercentDeposit
              name="percentDeposit"
              value={state.percentDeposit}
            />
          </InputField>

          <InputField caption="Срок лизинга" name="months" value={state.months}>
            мес.
          </InputField>
        </div>

        <div className="leasing-form__infos">
          <InfoField caption="Сумма договора лизинга" value={state.dealSum} />
          <InfoField caption="Ежемесячный платеж от" value={state.dealSum} />
        </div>

        <SubmitButton isLoading={isLoading} value="Оставить заявку" />

        {error && JSON.stringify(error, null, 2)}
      </form>
    </div>
  );
};

export default LeasingForm;
