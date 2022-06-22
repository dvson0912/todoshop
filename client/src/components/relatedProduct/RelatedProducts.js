import React from "react";
import Product from "../Products/Product";

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className="relatedProducts">
      {relatedProducts.map((item, index) => (
        <Product key={`relatedProduct-${index}`} item={item} />
      ))}
    </div>
  );
};

export default RelatedProducts;
