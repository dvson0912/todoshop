import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../../store/action/AuthAction";

const UserHome = () => {
  const user = useSelector((state) => state.User.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="userHome">
      <h4 className="userHome__heading">Tài Khoản</h4>
      <ul className="userHome__list">
        <li className="userHome__item">
          <Link className="userHome__item-link" to={"edit-info"}>
            Thay đổi thông tin tài khoản
          </Link>
        </li>
        <li className="userHome__item">
          <Link className="userHome__item-link" to={"edit-password"}>
            Thay đổi đổi mật khẩu tài khoản
          </Link>
        </li>
        <li className="userHome__item">
          <Link className="userHome__item-link" to={"order"}>
            Đơn hàng
          </Link>
        </li>
        <li
          className="userHome__item"
          onClick={() => dispatch(logout(user.accessToken, navigate))}
        >
          <FiLogOut />
          Đăng Xuất
        </li>
        {user.admin ? (
          <li className="userHome__item">
            <Link className="userHome__item-link" to={"/admin"}>
              Quản Lý
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default UserHome;
