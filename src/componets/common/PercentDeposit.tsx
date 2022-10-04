import React from "react";
import { calculate, change, validate } from "../../store/calc/calc.slice";
import { useAppDispatch } from "../../store/hooks";

const PercentDeposit: React.FC<{ value: number; name: string, isDisabled: boolean; }> = ({
  value,
  name,
  isDisabled,
}) => {
  const dispatch = useAppDispatch();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(change({ name, value }));
  };

  const handleBlur = ({
    target: { name, value },
  }: React.FocusEvent<HTMLInputElement>) => {
    dispatch(validate({ name, value }));
    dispatch(calculate({ name, value }));
  };

  return (
    <div className={`percent-deposit ${isDisabled ? 'disabled' : ''}`}>
      <input
        className="percent-deposit__input"
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        value={value + '%'}
        disabled={isDisabled}
      />
    </div>
  );
};

export default PercentDeposit;
