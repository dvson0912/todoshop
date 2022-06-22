import React from "react";
import { Link } from "react-router-dom";
import { urlServer } from "../../store/URL";

const Product = ({ item }) => {
  return (
    <div className="product">
      <Link to={`/products/${item.link}`} className="product__link">
        <div className="product__img">
          <img
            src={urlServer + item.avatar}
            alt=""
            className="product__img__avatar"
          />
          {item.color.length !== 0 ? (
            <div className="product__img__list">
              {item.color.map((item, index) => (
                <img src={urlServer + item} alt="" key={`color-img-${index}`} />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
        <h4 className="product__name">{item.name}</h4>
        <p className="product__price">
          {item.price}
          <sup>đ</sup>
        </p>
      </Link>
    </div>
  );
};

export default Product;
