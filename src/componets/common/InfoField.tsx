import React from "react";

const InfoField: React.FC<{ caption: string; value: number }> = ({
  caption,
  value,
}) => {
  return (
    <div className="info-field">
      <div className="info-field__caption">{caption}</div>
      <div className="info-field__value">
        {(
          String(value).slice(-9, -6) +
          " " +
          String(value).slice(-6, -3) +
          " " +
          String(value).slice(-3)
        ).trim()}{" "}
        <span className="ruble-char">₽</span>
      </div>
    </div>
  );
};

export default InfoField;
