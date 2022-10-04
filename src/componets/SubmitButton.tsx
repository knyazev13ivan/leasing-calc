import React from "react";
import Loader from "./common/Loader";

const SubmitButton: React.FC<{
  value: string;
  isLoading: boolean;
  isDisabled: boolean;
}> = ({ value, isLoading, isDisabled }) => {
  return (
    <button
      className="button submit-button"
      type="submit"
      disabled={isDisabled}
    >
      {isLoading ? <Loader /> : value}
    </button>
  );
};

export default SubmitButton;
