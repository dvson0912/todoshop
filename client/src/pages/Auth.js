import React, { lazy } from "react";
// import Login from "../components/Login/Login";
// import Register from "../components/Register/Register";
import Layout1 from "../layout/Layout1";
import Img from "../assets/imgs/Right Side.png";
import { Link } from "react-router-dom";

const Login = lazy(() => import("../components/Login/Login"));
const Register = lazy(() => import("../components/Register/Register"));

const Auth = ({ type }) => {
  return (
    <div className="auth">
      <div className="auth__banner">
        <img className="auth__banner-img" src={Img} alt="" />
      </div>
      <div className="auth__content">
        <h3 className="auth__content-heading">
          {type === "login" ? "Login" : "register"}
        </h3>

        {type === "login" ? (
          <span className="auth__content-title">
            Welcome back! Please enter your details.
          </span>
        ) : (
          <span className="auth__content-title">
            Welcome back! Please enter your details.
          </span>
        )}
        {type === "login" ? <Login /> : <Register />}
        {type === "login" ? (
          <span className="auth__content__link">
            Don’t have an account?
            <Link className="auth__content__link-a" to={"/user/register"}>
              Register
            </Link>
          </span>
        ) : (
          <span className="auth__content__link">
            Your have an account?
            <Link className="auth__content__link-a" to={"/user/login"}>
              Login
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default Layout1(Auth);
