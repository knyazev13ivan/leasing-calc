import React from "react";
import { calc } from "../../store/calc/calc.slice";
import { useAppDispatch } from "../../store/hooks";

const PercentDeposit: React.FC<{ value: number; name: string }> = ({
  value,
  name,
}) => {
  const dispatch = useAppDispatch();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(calc({ name, value }));
  };

  return (
    <div className="percent-deposit">
      <input
        className="percent-deposit__input"
        type="text"
        onChange={handleChange}
        name={name}
        value={value}
      />
      %
    </div>
  );
};

export default PercentDeposit;
