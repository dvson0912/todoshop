import React, { useState } from "react";
import Input from "../htmlComponents/Input";
import Button from "../htmlComponents/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/action/AuthAction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const handleEnter = (value, type) => {
    setUser({ ...user, [type]: value });
  };

  const handleSubmit = () => {
    if (user.userName === "" || user.password === "") {
      alert("Vui lòng nhập đầy đủ thông tin");
    } else {
      dispatch(login(user, navigate));
    }
  };

  return (
    <div className="form">
      <Input
        label={"userName"}
        className="form__row-input"
        type={"text"}
        name="userName"
        id="userName"
        value={user.userName}
        onChange={(e) => {
          handleEnter(e.target.value, "userName");
        }}
      />
      <Input
        className="form__row-input"
        type={"text"}
        name="password"
        id="password"
        label={"Password"}
        value={user.password}
        password
        onChange={(e) => {
          handleEnter(e.target.value, "password");
        }}
      />

      <Button
        label="Sign Up"
        className="btn btn--primary"
        type="submit"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Login;
