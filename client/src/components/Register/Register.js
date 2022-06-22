import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../store/action/AuthAction";
import Input from "../htmlComponents/Input";
import Loading from "../Loading/loadingCreate/Loading";
import Button from "../htmlComponents/Button";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const loading = useSelector((state) => state.Products.loading);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState({
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleOnchange = (value, type) => {
    if (type === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setUser({ ...user, [type]: value });
      setErr({ ...err, [type]: false });
    }
  };

  const handleBlur = (value, type) => {
    if (value === "") {
      setErr({ ...err, [type]: true });
    }
    if (
      (type === "email" && value !== "" && value.indexOf("@") === -1) ||
      (value.indexOf(".") <= value.indexOf("@") && type === "email")
    ) {
      console.log(type);

      setErr({ ...err, [type]: true });
    }
  };

  const handleSubmid = () => {
    if (
      user.email === "" ||
      user.userName === "" ||
      user.confirmPassword === "" ||
      user.password === "" ||
      err.userName ||
      err.confirmPassword ||
      err.password
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
    } else if (user.password.length < 6 || user.userName.length < 6) {
      alert("userName và password ít nhất 6 kí tự");
    } else if (user.password !== confirmPassword) {
      alert("password and confirmPassword khác nhau");
    } else if (err.email) {
      alert("Vui lòng nhập email");
    } else if (
      !err.email &&
      !err.userName &&
      !err.confirmPassword &&
      !err.password
    ) {
      dispatch(register(user, navigate));
    }
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="form">
          <Input
            label={"userName"}
            className={`form__row-input ${
              err.userName ? "form__row-input--err" : ""
            }`}
            type={"text"}
            name="userName"
            id="userName"
            value={user.userName}
            onChange={(e) => {
              handleOnchange(e.target.value, "userName");
            }}
            onBlur={(e) => {
              handleBlur(e.target.value, "userName");
            }}
          />
          <Input
            label={"email"}
            className={`form__row-input ${
              err.email ? "form__row-input--err" : ""
            }`}
            type={"text"}
            name="email"
            id="email"
            value={user.email}
            onChange={(e) => {
              handleOnchange(e.target.value, "email");
            }}
            onBlur={(e) => {
              handleBlur(e.target.value, "email");
            }}
          />
          <Input
            label={"password"}
            className={`form__row-input ${
              err.password ? "form__row-input--err" : ""
            }`}
            type={"text"}
            name="password"
            id="password"
            password
            value={user.password}
            onChange={(e) => {
              handleOnchange(e.target.value, "password");
            }}
          />
          <Input
            password
            label={"confirmPassword"}
            className={`form__row-input ${
              err.confirmPassword ? "form__row-input--err" : ""
            }`}
            type={"text"}
            name="ConfirmPassword"
            id="ConfirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              handleOnchange(e.target.value, "confirmPassword");
            }}
          />
          <Button
            label={"Register"}
            className="btn btn--primary"
            type="submit"
            onClick={() => {
              handleSubmid();
            }}
          />
        </div>
      )}
    </>
  );
};

export default Register;
