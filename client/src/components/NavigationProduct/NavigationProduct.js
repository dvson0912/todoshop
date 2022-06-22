import React from "react";
import { Link } from "react-router-dom";
import TranslateLink from "../../hooks/translateLink";

const NavigationProduct = ({ product }) => {
  return (
    <div className="navigationProduct">
      <Link className="navigationProduct__link" to={"/"}>
        Trang chủ
      </Link>
      <span className="navigationProduct__space">/</span>
      <Link className="navigationProduct__link" to={"/category"}>
        sản phẩm
      </Link>
      <span className="navigationProduct__space">/</span>
      <Link
        className="navigationProduct__link"
        to={`/category/${TranslateLink(product.nameCategory)}`}
      >
        {product.nameCategory}
      </Link>
      <span className="navigationProduct__space">/</span>
      <Link
        className="navigationProduct__link"
        to={`/category/${TranslateLink(product.nameCategory)}/${TranslateLink(
          product.nameType
        )}`}
      >
        {product.nameType}
      </Link>
      <span className="navigationProduct__space">/</span>
      <span className="navigationProduct__name">{product.name}</span>
    </div>
  );
};

export default NavigationProduct;
