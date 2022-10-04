import React from "react";
import { useSubmitLeasingFormMutation } from "../store/calc/calc.api";
import { useAppSelector } from "../store/hooks";
import InfoField from "./common/InfoField";
import InputField from "./common/InputField";
import PercentDeposit from "./common/PercentDeposit";
import SubmitButton from "./SubmitButton";

const LeasingForm: React.FC = () => {
  const state = useAppSelector((state) => state.calc);

  const [submitLeasingForm, { isLoading }] =
    useSubmitLeasingFormMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    await submitLeasingForm(JSON.stringify(state));
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
            isDisabled={isLoading}
          >
            ₽
          </InputField>

          <InputField
            caption="Первоначальный взнос"
            name="initialDeposit"
            value={state.initialDeposit}
            isDisabled={isLoading}
          >
            <PercentDeposit
              name="percentDeposit"
              value={state.percentDeposit}
              isDisabled={isLoading}
            />
          </InputField>

          <InputField
            caption="Срок лизинга"
            name="months"
            value={state.months}
            isDisabled={isLoading}
          >
            мес.
          </InputField>
        </div>

        <div className="leasing-form__infos">
          <InfoField caption="Сумма договора лизинга" value={state.dealSum} />
          <InfoField
            caption="Ежемесячный платеж от"
            value={state.monthlyPayment}
          />

          <SubmitButton
            isDisabled={isLoading}
            isLoading={isLoading}
            value="Оставить заявку"
          />
        </div>
      </form>
    </div>
  );
};

export default LeasingForm;
