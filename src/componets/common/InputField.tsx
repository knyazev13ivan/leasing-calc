import React, { useLayoutEffect, useRef, useState } from "react";
import { calc } from "../../store/calc/calc.slice";
import { useAppDispatch } from "../../store/hooks";

interface IInputField {
  children: React.ReactNode;
  name: string;
  caption: string;
  value: number;
}

const InputField: React.FC<IInputField> = ({
  children,
  name,
  caption,
  value,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [position, setPosition] = useState<number>(0);

  useLayoutEffect(() => {
    if (inputRef.current?.offsetWidth)
      setPosition(inputRef.current?.offsetWidth);
  }, []);

  const dispatch = useAppDispatch();

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(calc({ name, value }));
  };

  return (
    <div className="input-field">
      <label className="input-field__label">
        <span>{caption}</span>

        <input
          type="text"
          value={value}
          onChange={handleChange}
          name={name}
          ref={inputRef}
        />
        <div className="input-field-extension">{children}</div>

        <div className="input-field__range">
          <div
            className="input-field__range-line"
            style={{ width: position }}
          ></div>
          <div
            className="input-field__range-circle"
            style={{ left: position }}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default InputField;
