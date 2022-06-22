import React from "react";

const Button = ({ label, ...props }) => {
  return (
    <div className="form__row-btn">
      <button {...props}>{label}</button>
    </div>
  );
};

export default Button;
