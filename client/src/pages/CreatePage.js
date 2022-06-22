import React from "react";
import { useParams } from "react-router-dom";
import CreateCategory from "../components/componentCreate/CreateCategory/CreateCategory";
import CreateProduct from "../components/componentCreate/CreateProduct/CreateProduct";
import CreateType from "../components/componentCreate/CreateType/CreateType";

const CreatePage = () => {
  const slug = useParams();
  const create = slug.create;
  return (
    <div>
      {create === "category" ? (
        <CreateCategory />
      ) : create === "type" ? (
        <CreateType />
      ) : create === "product" ? (
        <CreateProduct />
      ) : (
        ""
      )}
    </div>
  );
};

export default CreatePage;
