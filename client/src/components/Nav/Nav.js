import React, { useEffect, useState } from "react";
import { BiUserCircle, BiSearch, BiMenu } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineInstagram, AiFillYoutube } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { Link } from "react-router-dom";

import Logo from "../../assets/imgs/store_1587022637_735.jpg";
import Call from "../../assets/imgs/hotlinehd.png";
import MobileNav from "./MobileNav";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../store/action/CategoryAction";
import Search from "../Search/Search";

const NavList = [
  {
    name: "new arrivals",
    path: "/category",
  },
  {
    name: "ƯU ĐÃI HOT",
    path: "/product",
  },
  {
    name: "Chính Sách",
    path: "/product",
  },
  {
    name: "Toto Fanzone",
    path: "/product",
  },
];

const Nav = () => {
  const [isShow, setIsShow] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const categorys = useSelector((state) => state.Products.categorys);
  const cart = useSelector((state) => state.Cart.cart);
  const dispatch = useDispatch();
  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };
  const handleShowMenu = () => {
    setIsShow(!isShow);
  };
  const user = useSelector((state) => state.User.user);
  const totalQuantity =
    cart &&
    cart.reduce((result, item) => {
      if (item.quantity >= 0) {
        return result + item.quantity;
      }
      return result;
    }, 0);
  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  return (
    <>
      {showSearch && <Search handleShowSearch={handleShowSearch} />}
      <div
        className={`background ${isShow ? "show" : ""}`}
        onClick={handleShowMenu}
      ></div>
      <MobileNav
        NavList={NavList}
        onClick={handleShowMenu}
        active={isShow}
        categorys={categorys}
        user={user}
      />
      <div className="nav">
        <div className="nav__menu show-on-tablet">
          <BiMenu onClick={handleShowMenu} />
        </div>
        <div className="nav__logo">
          <Link to="/">
            <img src={Logo} alt="" className="nav__logo-img" />
          </Link>
        </div>
        <ul className="nav__content__list">
          <li className="nav__content__item hide-on-tablet">
            <Link
              to={`${user && user.userName ? "/user/profile" : "/user/login"}`}
            >
              <BiUserCircle className="nav__content__icon" />
            </Link>
          </li>
          <li className="nav__content__item" onClick={handleShowSearch}>
            <BiSearch className="nav__content__icon" />
          </li>
          <li className="nav__content__item">
            <Link to={"/cart"}>
              <HiOutlineShoppingBag className="nav__content__icon" />
              <span className="nav__content__item-count">
                {Number.parseInt(totalQuantity)}
              </span>
            </Link>
          </li>
        </ul>
        <ul className="nav__menu__list hide-on-tablet">
          {NavList &&
            NavList.map((item, index) => (
              <li className="nav__menu__item" key={`menu-${index}`}>
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
        <div className="nav__call hide-on-tablet">
          <img src={Call} alt="" className="nav__call-img" />
          <span className="nav__call-phone">1900 633 501</span>
        </div>
        <ul className="nav__link__list hide-on-tablet">
          <li className="nav__link__item">
            <a
              href="https://www.facebook.com/Totoshop.com.vn/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>
          </li>
          <li className="nav__link__item">
            <a
              href="https://www.youtube.com/channel/UCNlOKoeutijiatYxUkDXGnA"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillYoutube />
            </a>
          </li>
          <li className="nav__link__item">
            <a
              href="https://zalo.me/2610168921726633921"
              target="_blank"
              rel="noreferrer"
            >
              <SiZalo />
            </a>
          </li>
          <li className="nav__link__item">
            <a
              href="https://www.instagram.com/accounts/login/?next=/totoshopvn/"
              target="_blank"
              rel="noreferrer"
            >
              <AiOutlineInstagram />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Nav;
