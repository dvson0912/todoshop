import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ link }) => {
  const menu = [
    {
      title: "Quản Lý Category",
      link: "category",
    },
    {
      title: "Quản Lý Type",
      link: "type",
    },
    {
      title: "Quản Lý Products",
      link: "products",
    },
    {
      title: "Quản Lý Posts",
      link: "posts",
    },
    {
      title: "Quản Lý Users",
      link: "users",
    },
    {
      title: "Quản Lý Đơn Hàng",
      link: "don-hang",
    },
  ];
  return (
    <div className="admin-menu">
      <h3 className="admin-menu__heading">Trang Chủ Admin</h3>
      <ul className="admin-menu__list">
        {menu.map((item, index) => {
          return (
            <li
              key={index + "menuAdmin"}
              className={`admin-menu__item ${
                link === item.link ? "active" : ""
              }`}
            >
              <Link
                to={"/admin/" + item.link}
                className="admin-menu__item-text"
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link className="admin-menu__gohome" to={"/"}>
        Go Home
      </Link>
    </div>
  );
};

export default Menu;
