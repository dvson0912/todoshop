import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../htmlComponents/Button";
import Input from "../../htmlComponents/Input";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../store/action/AuthAction";

const UserUpdatePassword = () => {
  const user = useSelector((state) => state.User.user);

  const [data, setData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEnterInput = (type, value) => {
    setData({ ...data, [type]: value });
  };

  const handleSubmit = () => {
    if (data.confirmPassword !== data.newPassword) {
      alert("Mật khẩu mới và xác thực mật khẩu không khớp nhau!");
    } else {
      const { confirmPassword, ...other } = data;
      dispatch(updatePassword(other, user.accessToken, navigate));
    }
  };

  return (
    <div className="update">
      <p className="update__title">Đổi mật khẩu tài khoản cá nhân</p>
      <div className="form update__form">
        <Input
          label={"Mật Khẩu Củ"}
          type={"text"}
          password
          className={"form__row-input"}
          value={data.currentPassword}
          onChange={(e) => handleEnterInput("currentPassword", e.target.value)}
        />
        <Input
          label={"Mật Khẩu Mới"}
          type={"text"}
          password
          className={"form__row-input"}
          value={data.newPassword}
          onChange={(e) => handleEnterInput("newPassword", e.target.value)}
        />
        <Input
          label={"Nhập Lại Mật Khẩu Mới"}
          type={"text"}
          password
          className={"form__row-input"}
          value={data.confirmPassword}
          onChange={(e) => handleEnterInput("confirmPassword", e.target.value)}
        />
        <div className="update__form__btn">
          <Button
            label={"Xác Nhận"}
            className={"btn btn--primary"}
            onClick={handleSubmit}
          />
          <Button
            label={"Hủy"}
            className={"btn btn--black"}
            onClick={() => navigate("/user/profile")}
          />
        </div>
      </div>
    </div>
  );
};

export default UserUpdatePassword;
