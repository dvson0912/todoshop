import React, { useState } from "react";
import Input from "../../htmlComponents/Input";
import Button from "../../htmlComponents/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateInfo } from "../../../store/action/AuthAction";

const UserUpdateInfo = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.User.user);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    email: user.email || "",
    address: user.address || "",
  });
  console.log();

  const handleEnterInput = (type, value) => {
    // if (type === "phone") {
    //   if (value >= 0 || value === "") {
    //     setData({ ...data, [type]: Number.parseInt(value) || "" });
    //   }
    // } else {
    setData({ ...data, [type]: value });
    // }
  };

  const handleSubmit = () => {
    if (
      data.name === user.name &&
      data.phone === user.phone &&
      data.email === user.email &&
      data.address === user.address
    ) {
      alert("Không có thông tin nào cần cập nhật");
    } else if (data.phone.indexOf("e") !== -1) {
      alert("Số Điện Thoại Không Hợp Lệ");
    } else {
      dispatch(updateInfo(data, user.accessToken, navigate));
    }
  };

  return (
    <div className="update">
      <p className="update__title">Sửa thông tin tài khoản cá nhân</p>
      <div className="form update__form">
        <Input
          label={"Họ và tên"}
          value={data.name}
          type={"text"}
          className={"form__row-input"}
          onChange={(e) => {
            handleEnterInput("name", e.target.value);
          }}
        />
        <Input
          label={"Điện Thoại"}
          type={"text"}
          value={data.phone}
          className={"form__row-input"}
          onChange={(e) => {
            handleEnterInput("phone", e.target.value);
          }}
        />
        <Input
          type={"text"}
          label={"Email"}
          value={data.email}
          className={"form__row-input"}
          onChange={(e) => {
            handleEnterInput("email", e.target.value);
          }}
        />
        <Input
          type={"text"}
          label={"Address"}
          value={data.address}
          className={"form__row-input"}
          onChange={(e) => {
            handleEnterInput("address", e.target.value);
          }}
        />
        <div className="update__form__btn">
          <Button
            label={"Cập Nhật"}
            className="btn btn--primary"
            onClick={handleSubmit}
          />
          <Button
            label={"Hủy"}
            className="btn btn--black"
            onClick={() => navigate("/user/profile")}
          />
        </div>
      </div>
    </div>
  );
};

export default UserUpdateInfo;
