import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  calculate,
  change,
  config,
  validate,
} from "../../store/calc/calc.slice";
import {
  useAppDispatch,
  useAppSelector,
  useWindowWidth,
} from "../../store/hooks";

interface IInputField {
  children: React.ReactNode;
  name: string;
  caption: string;
  value: number;
  isDisabled: boolean;
}

const InputField: React.FC<IInputField> = ({
  children,
  name,
  caption,
  value,
  isDisabled,
}) => {
  const rangeRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [position, setPosition] = useState<number>(0);
  const [cursorPos, setCursorPos] = useState<number>(0);
  const carCost = useAppSelector((state) => state.calc.carCost);
  const windowWidth = useWindowWidth();

  const dispatch = useAppDispatch();

  let ratio =
    (value - config[name].min) / (config[name].max - config[name].min);
  if (name === "initialDeposit") {
    const percent = useAppSelector((state) => state.calc.percentDeposit);
    ratio =
      (percent - config.percentDeposit.min) /
      (config.percentDeposit.max - config.percentDeposit.min);
  }

  useLayoutEffect(() => {
    if (rangeRef.current?.offsetWidth)
      setPosition(Math.round(rangeRef.current?.offsetWidth * ratio));
  }, [windowWidth]);

  const handleChange = ({
    target: { name, value, selectionStart },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (selectionStart) setCursorPos(selectionStart);
    dispatch(change({ name, value }));
  };

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.selectionStart = cursorPos;
      inputRef.current.selectionEnd = cursorPos;
    }
  }, [cursorPos]);

  const handleBlur = ({
    target: { name, value },
  }: React.FocusEvent<HTMLInputElement>) => {
    dispatch(validate({ name, value }));
    dispatch(calculate({ name, value }));
  };

  const handleDrag = (event: React.DragEvent) => {
    const rect = rangeRef.current?.getBoundingClientRect();

    if (rect) {
      if (event.pageX - rect.x >= 0 && event.pageX - rect.x <= rect.width + 1) {
        if (name === "initialDeposit") {
          const value = Math.floor(
            ((((event.pageX - rect.x) / rect.width) *
              (config.percentDeposit.max - config.percentDeposit.min) +
              config.percentDeposit.min) /
              100) *
              carCost
          );
          dispatch(change({ name, value }));
          dispatch(calculate({ name, value }));

          setPosition(event.pageX - rect.x);
        } else {
          const value = Math.floor(
            ((event.pageX - rect.x) / rect.width) *
              (config[name].max - config[name].min) +
              config[name].min
          );
          dispatch(change({ name, value }));
          dispatch(calculate({ name, value }));

          setPosition(event.pageX - rect.x);
        }
      }
    }
  };

  const handleOnClickRange = (event: React.MouseEvent) => {
    const rect = rangeRef.current?.getBoundingClientRect();

    if (rect) {
      if (name === "initialDeposit") {
        const value = Math.floor(
          ((((event.pageX - rect.x) / rect.width) *
            (config.percentDeposit.max - config.percentDeposit.min) +
            config.percentDeposit.min) /
            100) *
            carCost
        );
        dispatch(change({ name, value }));
        dispatch(calculate({ name, value }));

        setPosition(event.pageX - rect.x);
      } else {
        const value = Math.floor(
          ((event.pageX - rect.x) / rect.width) *
            (config[name].max - config[name].min) +
            config[name].min
        );
        dispatch(change({ name, value }));
        dispatch(calculate({ name, value }));

        setPosition(event.pageX - rect.x);
      }
    }
  };

  return (
    <div className={`input-field ${isDisabled ? "disabled" : ""}`}>
      <label className="input-field__label" htmlFor={name}>
        <span>{caption}</span>
      </label>
      <div className="input-field-container">
        <input
          className="input-field-container__input"
          ref={inputRef}
          type="text"
          value={(
            String(value).slice(-9, -6) +
            " " +
            String(value).slice(-6, -3) +
            " " +
            String(value).slice(-3) +
            (name === 'initialDeposit' ? ' ₽' : '')
          ).trim()}
          onChange={handleChange}
          onBlur={handleBlur}
          name={name}
          disabled={isDisabled}
        />

        <div
          className="input-field-range"
          ref={rangeRef}
          onClick={handleOnClickRange}
        >
          <div
            className="input-field-range__line"
            style={{ width: position }}
          ></div>
          <div
            className="input-field-range__circle"
            style={{ left: position }}
            draggable={true}
            onDrag={handleDrag}
          ></div>
        </div>
        <div className="input-field-container__extension">{children}</div>
      </div>
    </div>
  );
};

export default InputField;
