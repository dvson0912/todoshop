import React from "react";
import Layout1 from "../layout/Layout1";
import Img from "../assets/imgs/bg-page-header.webp";
import { Link } from "react-router-dom";
import UserHome from "../components/UserComponent/UserHome/UserHome";
import UserUpdateInfo from "../components/UserComponent/UserUpdateInfo/UserUpdateInfo";
import UserUpdatePassword from "../components/UserComponent/UserUpdatePassword/UserUpdatePassword";
import UserOrder from "../components/UserComponent/UserOrder/UserOrder";
import OrderDetails from "../components/UserComponent/OrderDetails/OrderDetails";

const UserPage = ({ title, path }) => {
  return (
    <div className="userPage">
      <div className="userPage__banner">
        <img src={Img} alt="" />
        <div className="userPage__banner__top">
          <h3 className="userPage__banner__top-heading">{title}</h3>
          <div className="userPage__banner__top__nav">
            <Link className="userPage__banner__top__nav-link" to={"/"}>
              Trang Chủ
            </Link>
            <span>{">"}</span>
            <span className="userPage__banner__top__nav-title">{title}</span>
          </div>
        </div>
      </div>
      {path === "home" ? (
        <UserHome />
      ) : path === "updateInfo" ? (
        <UserUpdateInfo />
      ) : path === "updatePassword" ? (
        <UserUpdatePassword />
      ) : path === "order" ? (
        <UserOrder />
      ) : path === "orderDetails" ? (
        <OrderDetails />
      ) : (
        ""
      )}
    </div>
  );
};

export default Layout1(UserPage);
