import React from "react";

const InfoField: React.FC<{ caption: string; value: number }> = ({
  caption,
  value,
}) => {
  return (
    <div className="info-field">
      <div className="info-field__caption">{caption}</div>
      <div className="info-field__value">{value} ₽</div>
    </div>
  );
};

export default InfoField;
