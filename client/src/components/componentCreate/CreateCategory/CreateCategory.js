import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TranslateLink from "../../../hooks/translateLink";
import { createCategory } from "../../../store/action/CategoryAction";
import Button from "../../htmlComponents/Button";
import Input from "../../htmlComponents/Input";
import Loading from "../../Loading/loadingCreate/Loading";

const CreateCategory = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.Products.loading);
  const [data, setData] = useState({
    name: "",
    link: "",
  });
  const handleSubmit = () => {
    if (data.name === "") {
      alert("Vui lòng nhập trước khi tạo");
    } else {
      dispacth(createCategory(data, navigate));
    }
  };

  return (
    <>
      {loading === true ? <Loading /> : ""}
      <div className="create">
        <div className="create-container">
          <div className="create-content">
            <h3 className="create-content__heading">
              Tạo Category Mới Cho Website
            </h3>
            <div className="form">
              <Input
                label={"Tên Category"}
                className="form__row-input"
                type="text"
                id="name"
                value={data.name || ""}
                placeholder=" "
                onChange={(e) =>
                  setData({
                    name: e.target.value,
                    link: TranslateLink(e.target.value),
                  })
                }
              />
              <Button
                label={"Tạo"}
                className="btn btn--primary"
                onClick={() => {
                  handleSubmit();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
