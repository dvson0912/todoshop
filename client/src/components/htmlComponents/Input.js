import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = ({ label, password, type, ...types }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="form__row">
      <input
        {...types}
        placeholder=" "
        type={!password ? type : showPassword ? "text" : "password"}
      />
      <label className="form__row-label" htmlFor="userName">
        {label}
      </label>
      {password && (
        <div
          className="form__row-eye"
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </div>
      )}
    </div>
  );
};

export default Input;
