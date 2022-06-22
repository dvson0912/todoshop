import React from "react";
import ContentCategory from "./contentCategory/ContentCategory";
import ContentProducts from "./contentProducts/ContentProducts";
import ContentType from "./contentType/ContentType";

const ManageContent = ({ link }) => {
  return (
    <div className="manage">
      {link === "category" ? (
        <ContentCategory />
      ) : link === "type" ? (
        <ContentType />
      ) : link === "products" ? (
        <ContentProducts />
      ) : (
        ""
      )}
    </div>
  );
};

export default ManageContent;
