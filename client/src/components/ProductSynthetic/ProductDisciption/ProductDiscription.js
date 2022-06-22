import React from "react";
import { urlServer } from "../../../store/URL";

const ProductDiscription = ({ descriptionImg }) => {
  return (
    <div>
      {descriptionImg
        ? descriptionImg.map((item, index) => (
            <img key={index} width="100%" src={urlServer + item} alt="" />
          ))
        : ""}
    </div>
  );
};

export default ProductDiscription;
