import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TranslateLink from "../../../hooks/translateLink";
import { getAllCategory } from "../../../store/action/CategoryAction";
import { getAllType } from "../../../store/action/TypeAction";
import { urlServer } from "../../../store/URL";
import Button from "../../htmlComponents/Button";
import Input from "../../htmlComponents/Input";
import Loading from "../../Loading/loadingCreate/Loading";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.Products.categorys);
  const loading = useSelector((state) => state.Products.loading);
  const types = useSelector((state) => state.Products.types);

  const [data, setData] = useState({
    name: "",
    avatar: "",
    price: null,
    size: [],
    color: [],
    descriptionImg: [],
    category: "",
    type: "",
  });

  const typeOfCategory =
    Array.isArray(types) &&
    types.filter((item) => {
      return item.category === data.category;
    });
  const handleSelect = (value, type) => {
    if (type === "type") {
      const select =
        Array.isArray(types) && types.find((item) => item.name === value);
      setData({ ...data, type: select && select._id });
    }
    if (type === "category") {
      const select = categorys.find((item) => item.name === value);
      setData({ ...data, category: select && select._id });
    }
  };
  const handleEnter = (value, type) => {
    if (type === "name") {
      const link = TranslateLink(value);
      setData({ ...data, [type]: value, link });
    } else if (type !== "size") {
      if (type === "price") {
        if (value > 0) {
          setData({ ...data, [type]: value });
        }
      } else {
        setData({ ...data, [type]: value });
      }
    } else if (type === "size") {
      const size = value.indexOf(",") === -1 ? [value] : value.split(",");
      const dataSize = size.filter((item) => {
        if (item !== "") {
          return true;
        }
        return false;
      });
      setData({ ...data, [type]: dataSize });
    }
  };
  const handleSubmit = (e) => {
    if (
      data.name === "" ||
      data.avatar === "" ||
      data.price === "" ||
      data.category === "" ||
      data.type === ""
    ) {
      alert("Vui lòng điền những thông tin cần thiết");
      e.preventDefault();
    } else if (
      data.avatar === "not image" ||
      data.descriptionImg === "not image" ||
      data.color.includes("not image")
    ) {
      alert("Chỉ được chọn file ảnh");
      e.preventDefault();
    }
  };
  useLayoutEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllType());
  }, [dispatch]);
  return (
    <>
      {loading && <Loading />}
      <div className="create">
        <div className="create-container">
          <div className="create-content">
            <h3 className="create-content__heading">
              Tạo Products Mới Cho Website
            </h3>
            <form
              method="POST"
              action={`${urlServer}/product/create`}
              encType="multipart/form-data"
              onSubmit={(e) => handleSubmit(e)}
              className="form"
            >
              <Input
                label={"Tên sản phẩm"}
                type={"text"}
                name="name"
                className={`form__row-input `}
                id="name"
                placeholder=" "
                value={data.name}
                onChange={(e) => {
                  handleEnter(e.target.value, "name");
                }}
              />

              <input
                type={"text"}
                name="link"
                className={`form__row-input `}
                style={{ display: "none" }}
                value={data.link}
              />
              <div className="form__row">
                <label className="form__row__label">Chọn avatar</label>
                <div className="form__row__list">
                  {data.avatar && (
                    <img
                      className="form__row__list-img"
                      src={data.avatar}
                      alt=""
                    />
                  )}
                </div>
                <input
                  type={"file"}
                  name="avatar"
                  onChange={(e) => {
                    const type = e.target.files[0].type;
                    if (type.indexOf("image") !== -1) {
                      handleEnter(
                        window.URL.createObjectURL(e.target.files[0]),
                        "avatar"
                      );
                    } else {
                      handleEnter("not image", "avatar");
                      alert("Chỉ Được Chọn file Ảnh");
                    }
                  }}
                />
              </div>
              <Input
                label={" Giá tiền"}
                type={"number"}
                className={`form__row-input`}
                name="price"
                placeholder=" "
                value={data.price || ""}
                onChange={(e) => {
                  handleEnter(e.target.value, "price");
                }}
              />
              <Input
                label={"Chọn size(Mỗi size cách nhau 1 dấu ,)"}
                className={`form__row-input`}
                type={"text"}
                name="size"
                placeholder=" "
                onChange={(e) => {
                  handleEnter(e.target.value, "size");
                }}
              />

              <div className="form__row">
                <label className="form__row__label">Chọn Color</label>
                <div className="form__row__list">
                  {data.color &&
                    data.color.map((item, index) => (
                      <img
                        className="form__row__list-img"
                        src={item}
                        alt=""
                        x={`color-${index}`}
                        key={`color-${index}`}
                      />
                    ))}
                </div>
                <input
                  type={"file"}
                  name="color"
                  multiple
                  onChange={(e) => {
                    let color = [];
                    if (e.target.files) {
                      for (const key in e.target.files) {
                        if (
                          key !== "length" &&
                          key !== "item" &&
                          e.target.files[0].type.indexOf("image") !== -1
                        ) {
                          if (e.target.files[0].type.indexOf("image") !== -1) {
                            color.push(
                              window.URL.createObjectURL(e.target.files[key])
                            );
                          } else {
                            color.push("not image");
                            alert("Chỉ Được Chọn file Ảnh");
                          }
                        }
                      }
                      handleEnter(color, "color");
                    }
                  }}
                />
              </div>
              <div className="form__row">
                <label className="form__row__label">Chọn ảnh mô tả</label>
                <div className="form__row__list">
                  {data.descriptionImg &&
                    data.descriptionImg.map((item, index) => (
                      <img
                        className="form__row__list-img"
                        src={item}
                        alt=""
                        x={`descriptionImg-${index}`}
                        key={`descriptionImg-${index}`}
                      />
                    ))}
                </div>
                <input
                  type={"file"}
                  name="descriptionImg"
                  multiple
                  onChange={(e) => {
                    let descriptionImg = [];
                    if (e.target.files) {
                      for (const key in e.target.files) {
                        if (key !== "length" && key !== "item") {
                          descriptionImg.push(
                            window.URL.createObjectURL(e.target.files[key])
                          );
                        }
                      }
                      handleEnter(descriptionImg, "descriptionImg");
                    }
                  }}
                />
              </div>
              <div className="form__row">
                <label className="form__row__label">Chọn category</label>
                <input
                  type={"text"}
                  value={data.category}
                  name="category"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleEnter(e.target.value, "category");
                  }}
                />
                <select
                  className="form__row__select"
                  onChange={(e) => {
                    handleSelect(e.target.value, "category");
                  }}
                >
                  <option className="form__row__select-item">
                    Chọn Category
                  </option>

                  {Array.isArray(categorys) &&
                    categorys.map((category) => (
                      <option
                        className="form__row__select-item"
                        key={category._id}
                      >
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form__row">
                <label className="form__row__label">Chọn type</label>
                <input
                  type={"text"}
                  value={data.type}
                  name="type"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleEnter(e.target.value, "type");
                  }}
                />
                <select
                  className="form__row__select"
                  onChange={(e) => {
                    handleSelect(e.target.value, "type");
                  }}
                >
                  <option className="form__row__select-item">Chọn Type</option>
                  {typeOfCategory &&
                    typeOfCategory.map((type) => (
                      <option className="form__row__select-item" key={type._id}>
                        {type.name}
                      </option>
                    ))}
                </select>
              </div>
              <Button className="btn btn--primary" label={"Tạo"} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
