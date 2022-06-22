import React, { useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../store/action/CartAction";
import { urlServer } from "../../store/URL";
// import Message from "../Message/Message";

const ProductContent = ({ product }) => {
  const [avatar, setAvatar] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.Cart.cart);
  const dispatch = useDispatch();

  const handleClickColor = (colorActive) => {
    if (colorActive !== avatar) {
      setAvatar(colorActive);
      setColor(colorActive);
    } else {
      setAvatar("");
      setColor("");
    }
  };
  const handleClickSize = (sizeActive) => {
    if (sizeActive !== size) {
      setSize(sizeActive);
    } else {
      setSize("");
    }
  };
  const handleClickQuantity = (action) => {
    if (action === "up") {
      setQuantity(quantity + 1);
    }
    if (action === "down" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const setDisable = () => {
    let isDisableSize = true;
    let isDisableColor = true;
    if (product.size.length === 0) {
      isDisableSize = false;
    } else if (product.size.length !== 0 && size.length !== 0) {
      isDisableSize = false;
    }
    if (product.color.length === 0) {
      isDisableColor = false;
    } else if (product.color.length !== 0 && color.length !== 0) {
      isDisableColor = false;
    }

    return isDisableColor || isDisableSize ? "btn--disabled" : "";
  };

  const handleAndProductToCart = () => {
    if (setDisable().length === 0) {
      const item = {
        _id: product._id,
        avatar: color ? color : product.avatar,
        name: product.name,
        size: size,
        price: product.price,
        quantity: Number.parseInt(quantity),
        link: product.link,
      };
      dispatch(addProductToCart(item, cart));
      alert("Đã Thêm Sản Phẩm Vào Giỏ Hàng");
      return;
    }
    alert("Vui Lòng Chọn Color và Size");
  };
  return (
    <div className="productContent">
      <div className="productContent__img">
        <img
          src={avatar ? urlServer + avatar : urlServer + product.avatar}
          alt=""
        />
      </div>
      <div className="productContent__info">
        <h3 className="productContent__info-name">{product.name}</h3>
        <span className="productContent__info-price">
          {product.price}
          <sup>đ</sup>
        </span>
        {product.color && product.color.length !== 0 ? (
          <div className="productContent__info__color">
            <span className="productContent__info-title">Màu Sắc:</span>
            <div className="productContent__info__color-list">
              {product.color.map((item, index) => {
                return (
                  <div
                    key={`${item.id}-color-${index}`}
                    className={`productContent__info__color-item ${
                      color === item ? "active" : ""
                    }`}
                    onClick={() => {
                      handleClickColor(item);
                    }}
                  >
                    <img src={urlServer + item} alt="" />
                    <div className="productContent__info__color-item-icon">
                      <BsCheckLg />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}
        <div style={{ display: "flex", width: "100%", marginBottom: "30px" }}>
          {product.size && product.size.length !== 0 ? (
            <div className="productContent__info__size">
              <span className="productContent__info-title">Kích cỡ:</span>
              <div className="productContent__info__size-list">
                {product.size.map((item, index) => {
                  return (
                    <div
                      className={`productContent__info__size-item ${
                        size === item ? "active" : ""
                      }`}
                      onClick={() => handleClickSize(item)}
                      key={`${item.id}-size-${index}`}
                    >
                      <span>{item}</span>
                      <div className="productContent__info__size-item-icon">
                        <BsCheckLg />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="productContent__info__quantity">
            <span className="productContent__info-title">Số lượng:</span>
            <div className="productContent__info__quantity-box">
              <input
                type="number"
                name="quantity"
                id="quantity"
                className="productContent__info__quantity-input"
                value={quantity}
                onChange={(e) => {
                  if (e.target.value > 0) {
                    setQuantity(e.target.value);
                  }
                }}
              />
              <div
                className="productContent__info__quantity-btn productContent__info__quantity-btn--top"
                onClick={() => handleClickQuantity("up")}
              >
                <AiOutlineCaretUp />
              </div>
              <div
                className="productContent__info__quantity-btn productContent__info__quantity-btn--bottom"
                onClick={() => handleClickQuantity("down")}
              >
                <AiOutlineCaretDown />
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <button
            className={`btn btn--red ${setDisable()}`}
            onClick={(e) => handleAndProductToCart()}
          >
            thêm vào giỏ
          </button>
          <button className={`btn btn--primary ${setDisable()}`}>
            mua ngay
          </button>
        </div>
        <div className="productContent__info__insurance">
          <span>BẢO HÀNH SẢN PHẨM 90 NGÀY</span>
          <span>ĐỔI HÀNG TRONG VÒNG 30 NGÀY</span>
          <span>HOTLINE BÁN HÀNG 1900 633 501</span>
        </div>
      </div>
    </div>
  );
};

export default ProductContent;
