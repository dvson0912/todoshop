import React, { useState } from "react";

import Layout1 from "../layout/Layout1";
import ButtonOnTop from "../components/ButtonOnTop/ButtonOnTop";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCaretDown, AiFillCaretUp, AiOutlineClose } from "react-icons/ai";
import {
  CHANGE_QUANTITY_ITEM,
  DELETE_PRODUCT_CART,
  INCREASE_QUANTITY_ITEM,
  REDUCTION_QUANTITY_ITEM,
} from "../store/type";
import { CheckOut } from "../store/action/CartAction";
import { urlServer } from "../store/URL";

const Cart = () => {
  const cart = useSelector((state) => state.Cart.cart);
  const [check, setCheck] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPriceCart =
    Array.isArray(cart) &&
    cart.reduce((result, item, index) => {
      if (check && check.includes(index)) {
        return result + item.totalPrice;
      }
      return result;
    }, 0);
  const dischargeProducts =
    Array.isArray(cart) &&
    cart.filter((item, index) => {
      if (check && check.includes(index)) {
        return true;
      }
      return false;
    });
  console.log(dischargeProducts);
  return (
    <div className="cart">
      <div style={{ overflow: "auto" }}>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Avatar</th>
              <th>Tên Sản Phẩm</th>
              <th>Kích Thước</th>
              <th>Giá</th>
              <th>Số Lượng</th>
              <th>Tổng</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {cart.lenght !== 0 &&
              cart.map((item, index) => (
                <tr key={`cart_item-${index}`}>
                  <td
                    className="td-center"
                    style={{
                      width: "50px",
                    }}
                  >
                    <input
                      type={"checkbox"}
                      checked={check.includes(index)}
                      style={{
                        width: "15px",
                        height: "15px",
                      }}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheck([...check, index]);
                        } else {
                          setCheck(check.filter((item) => item !== index));
                        }
                      }}
                    />
                  </td>
                  <td className="td-w-100px td-center">
                    <img src={urlServer + item.avatar} alt="" />
                  </td>
                  <td className="td-w-200px">
                    <Link to={`/products/${item.link}`}>{item.name}</Link>
                  </td>
                  <td className="td-center td-w-200px ">{item.size}</td>
                  <td className="td-center td-w-200px">
                    {item.price}{" "}
                    <sup style={{ textTransform: "lowercase" }}>đ</sup>
                  </td>
                  <td className="td-center td-w-200px ">
                    <div className="td__quantity">
                      <div
                        className="td__quantity__btn td__quantity__btn--top"
                        onClick={() => {
                          dispatch({
                            type: INCREASE_QUANTITY_ITEM,
                            payload: {
                              _id: item._id,
                              avatar: item.avatar,
                              size: item.size,
                            },
                          });
                        }}
                      >
                        <AiFillCaretUp />
                      </div>

                      <input
                        type={"number"}
                        className="td__quantity-input"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => {
                          console.log(typeof item.quantity);
                          dispatch({
                            type: CHANGE_QUANTITY_ITEM,
                            payload: {
                              _id: item._id,
                              avatar: item.avatar,
                              size: item.size,
                              quantity: Number.parseInt(e.target.value),
                            },
                          });
                        }}
                        onBlur={(e) => {
                          if (e.target.value < 1) {
                            e.target.value = 1;
                            dispatch({
                              type: CHANGE_QUANTITY_ITEM,
                              payload: {
                                _id: item._id,
                                avatar: item.avatar,
                                size: item.size,
                                quantity: Number.parseInt(e.target.value),
                              },
                            });
                            alert("Số Lượng Phải lơn Hớn 1");
                          }
                        }}
                      />
                      <div
                        className="td__quantity__btn td__quantity__btn--bottom"
                        onClick={() => {
                          dispatch({
                            type: REDUCTION_QUANTITY_ITEM,
                            payload: {
                              _id: item._id,
                              avatar: item.avatar,
                              size: item.size,
                            },
                          });
                        }}
                      >
                        <AiFillCaretDown />
                      </div>
                    </div>
                  </td>
                  <td className="td-center td-w-200px">
                    {item.totalPrice}
                    <sup style={{ textTransform: "lowercase" }}>đ</sup>
                  </td>
                  <td
                    className="td-center td-w-100px"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setCheck([]);
                      dispatch({
                        type: DELETE_PRODUCT_CART,
                        payload: {
                          _id: item._id,
                          avatar: item.avatar,
                          size: item.size,
                        },
                      });
                    }}
                  >
                    <AiOutlineClose />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="cart__bottom">
        <p className="cart__bottom-title">Tổng Tiền</p>
        <span className="cart__bottom-price">
          {totalPriceCart}
          <sup>đ</sup>
        </span>
        <p className="cart__bottom-tutorial">
          Phí Vận chuyển và thuế tính lúc thanh toán
        </p>
        <div className="cart__bottom__btns">
          <Link
            to={"/category"}
            className="btn btn--primary cart__bottom__btns-link"
          >
            Tiếp Tục Mua Hàng
          </Link>
          <button
            className={`btn btn--primary cart__bottom__btns-button ${
              check.length === 0 ? "btn--disabled" : ""
            }`}
            onClick={() => {
              if (check.length !== 0) {
                dispatch(CheckOut(dischargeProducts, navigate));
              }
            }}
          >
            Thanh Toán
          </button>
        </div>
      </div>
      <ButtonOnTop />
    </div>
  );
};

export default Layout1(Cart);
