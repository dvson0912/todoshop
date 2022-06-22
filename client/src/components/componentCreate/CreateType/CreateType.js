import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TranslateLink from "../../../hooks/translateLink";
import { getCategory } from "../../../store/action/CategoryAction";
import { createType } from "../../../store/action/TypeAction";
import Button from "../../htmlComponents/Button";
import Loading from "../../Loading/loadingCreate/Loading";
import Input from "../../htmlComponents/Input";

const CreateType = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.Products.loading);
  const categorys = useSelector((state) => state.Products.categorys);
  const user = useSelector((state) => state.User.user);
  const [data, setData] = useState({
    name: "",
    link: "",
    category: "",
    nameCategory: "",
  });
  const handleSelect = (e) => {
    const category = categorys.docs.find(
      (category) => category.name.toLowerCase() === e.target.value.toLowerCase()
    );
    if (category) {
      setData({
        ...data,
        category: category._id,
        nameCategory: e.target.value,
      });
    } else {
      setData({ ...data, category: undefined, nameCategory: "" });
    }
  };
  const handleEnterInput = (e) => {
    setData({
      ...data,
      name: e.target.value,
      link: TranslateLink(e.target.value),
    });
  };
  const handleSubmit = () => {
    if (data.name === "" || data.category === "" || data.nameCategory === "") {
      alert("Vui lòng điền đầy đủ thông tin");
    } else {
      dispacth(createType(data, navigate, user.accessToken));
    }
  };
  useLayoutEffect(() => {
    dispacth(getCategory());
  }, [dispacth]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="create">
          <div className="create-container">
            <div className="create-content">
              <h3 className="create-content__heading">
                Tạo Type Mới Cho Website
              </h3>
              <div className="form">
                <Input
                  label={"Tên Category"}
                  className="form__row-input"
                  type="text"
                  value={data.name || ""}
                  placeholder=" "
                  onChange={handleEnterInput}
                />
                <div className="form__row">
                  <label className="form__row__label" htmlFor="category">
                    Chọn Category
                  </label>
                  <select
                    id="category"
                    className="form__row__select"
                    onChange={handleSelect}
                  >
                    <option className="form__row__select-item" value="">
                      --Please choose an option--
                    </option>
                    {categorys.docs &&
                      categorys.docs.map((category) => {
                        return (
                          <option
                            className="form__row__select-item"
                            value={category.name}
                            key={category._id}
                          >
                            {category.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <Button
                  label={"Tạo"}
                  className="btn btn--primary"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateType;
