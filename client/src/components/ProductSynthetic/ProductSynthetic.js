import React, { useState } from "react";
import TranslateLink from "../../hooks/translateLink";
import ProductDiscription from "./ProductDisciption/ProductDiscription";
import ProductEvaluate from "./ProductEvaluate/ProductEvaluate";

const ProductSynthetic = ({ descriptionImg, name }) => {
  const [active, setActive] = useState("mo-ta");
  const menu = ["Mô Tả", "Đánh Giá"];
  return (
    <div className="productSynthetic">
      <ul className="productSynthetic__link__list">
        {menu.map((item, index) => {
          return (
            <li
              key={`${TranslateLink(item)}-${index}`}
              className={`productSynthetic__link__item ${
                active === TranslateLink(item) ? "active" : ""
              }`}
            >
              <span
                className="productSynthetic__link__item-text"
                onClick={() => setActive(TranslateLink(item))}
              >
                {item}
              </span>
              {"danh-gia" === TranslateLink(item) ? (
                <span className="productSynthetic__link__item-evaluate">0</span>
              ) : (
                ""
              )}
            </li>
          );
        })}
      </ul>
      <div className="productSynthetic__content">
        {active === "mo-ta" ? (
          <ProductDiscription descriptionImg={descriptionImg} />
        ) : (
          <ProductEvaluate name={name} />
        )}
      </div>
    </div>
  );
};

export default ProductSynthetic;
