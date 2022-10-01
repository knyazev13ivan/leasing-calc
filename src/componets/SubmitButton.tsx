import React from "react";

const SubmitButton: React.FC<{ value: string; isLoading: boolean }> = ({
  value,
  isLoading,
}) => {
  return (
    <button className="submit-buttom" type="submit">
      {isLoading ? <div className="loader"></div> : value}
    </button>
  );
};

export default SubmitButton;
