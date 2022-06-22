import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { BiUserCircle } from "react-icons/bi";
import {
  AiOutlineClose,
  AiFillYoutube,
  AiOutlineInstagram,
} from "react-icons/ai";

import Call from "../../assets/imgs/hotlinehd.png";
import Logo from "../../assets/imgs/store_1587022637_735.jpg";

const MobileNav = ({ NavList, active, onClick, categorys, user }) => {
  return (
    <div className={`mb-nav ${active ? "show" : ""}`}>
      <div className="mb-nav__close">
        <AiOutlineClose onClick={onClick} />
      </div>
      <div className="mb-nav__logo">
        <Link to="/">
          <img src={Logo} alt="" className="mb-nav__logo-img" />
        </Link>
      </div>
      <ul className="mb-nav__content__list">
        <li className="mb-nav__content__item">
          <Link
            to={`${user && user.userName ? "/user/profile" : "/user/login"}`}
          >
            <BiUserCircle className="mb-nav__content__icon" />
          </Link>
        </li>
      </ul>
      <ul className="mb-nav__menu__list">
        {NavList.map((item, index) => (
          <li className="mb-nav__menu__item" key={`menu-${index}`}>
            <Link to={item.path}>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
        {Array.isArray(categorys) &&
          categorys.map((item, index) => (
            <li className="nav__menu__item" key={`menu-${item._id}`}>
              <Link to={"/category/" + item.link}>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
      </ul>
      <ul className="mb-nav__link__list">
        <li className="mb-nav__link__item">
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <FaFacebookF />
          </a>
        </li>
        <li className="mb-nav__link__item">
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <AiFillYoutube />
          </a>
        </li>
        <li className="mb-nav__link__item">
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <SiZalo />
          </a>
        </li>
        <li className="mb-nav__link__item">
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <AiOutlineInstagram />
          </a>
        </li>
      </ul>
      <div className="mb-nav__call">
        <img src={Call} alt="" className="mb-nav__call-img" />
        <span className="mb-nav__call-phone">1900 633 501</span>
      </div>
    </div>
  );
};

export default MobileNav;
