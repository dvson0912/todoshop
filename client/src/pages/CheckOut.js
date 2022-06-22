import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout1 from "../layout/Layout1";
import Input from "../components/htmlComponents/Input";
import { Link, useNavigate } from "react-router-dom";
import { Pay } from "../store/action/OrderAction";
import { urlServer } from "../store/URL";

const CheckOut = () => {
  const checkOutProducts = useSelector((state) => state.Cart.checkOutProducts);
  const user = useSelector((state) => state.User.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPriceOrder =
    checkOutProducts &&
    checkOutProducts.reduce((result, item) => {
      return result + item.totalPrice;
    }, 0);
  const [infoUser, setInfoUser] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    note: "",
  });
  const handleChangeInput = (type, value) => {
    setInfoUser({ ...infoUser, [type]: value || "" });
  };
  const handleSubmit = () => {
    console.log(infoUser);
    if (
      infoUser.name === "" ||
      infoUser.email === "" ||
      infoUser.phone === "" ||
      infoUser.address === ""
    ) {
      alert("Vui Lòng Nhập Đầy Đủ Thông Tin");
    } else {
      dispatch(
        Pay(
          {
            ...infoUser,
            products: checkOutProducts,
            quantity: 1,
            totalPriceOrder,
          },
          navigate
        )
      );
    }
  };
  return (
    <div className="checkOut">
      <h3 className="checkOut__heading">Thanh toán giỏ hàng</h3>
      <div className="checkOut__body">
        <div className="checkOut__item">
          <h4 className="checkOut__item-heading">
            <span>1</span>Thông tin hóa đơn
          </h4>
          <div className="form">
            <Input
              className="form__row-input"
              name="name"
              label={"Họ và Tên"}
              value={infoUser.name}
              onChange={(e) => {
                handleChangeInput("name", e.target.value);
              }}
            />
            <Input
              className="form__row-input"
              name="email"
              label={"Email"}
              value={infoUser.email}
              onChange={(e) => {
                handleChangeInput("email", e.target.value);
              }}
            />
            <Input
              className="form__row-input"
              name="phone"
              label={"Phone"}
              value={infoUser.phone}
              onChange={(e) => {
                handleChangeInput("phone", e.target.value);
              }}
            />
            <Input
              className="form__row-input"
              name="address"
              value={infoUser.address}
              label={"Địa Chỉ"}
              onChange={(e) => {
                handleChangeInput("address", e.target.value);
              }}
            />
            <textarea
              className="checkOut__item-textarea"
              placeholder="Ghi chú Đơn Hàng"
              cols={60}
              value={infoUser.note}
              onChange={(e) => {
                handleChangeInput("note", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="checkOut__item">
          <h4 className="checkOut__item-heading">
            <span>2</span>Phương thức thanh toán
          </h4>
          <div>
            <div className="form">
              <div className="form__row__checkbox">
                <input
                  className="logIn__checkbox"
                  type={"radio"}
                  name="payment"
                />
                <label className="form__row__checkbox-label">
                  Thanh toán tiền mặt khi nhận hàng (COD)
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="checkOut__item">
          <h4 className="checkOut__item-heading">
            <span>3</span>Thông tin giỏ hàng
          </h4>
          <div className="checkOut__table">
            <table className="table">
              <thead>
                <tr>
                  <th className="td-center td-w-200">Tên Sản Phẩm</th>
                  <th className="td-center">Số Lượng</th>
                  <th className="td-center">Giá</th>
                </tr>
              </thead>
              <tbody>
                {checkOutProducts &&
                  checkOutProducts.map((item, index) => {
                    return (
                      <tr key={item._id + item.size + index}>
                        <td
                          className="td-w-200px td-center"
                          // style={{
                          //   display: "flex",
                          //   minHeight: "100%",
                          //   alignItems: "center",
                          // }}
                        >
                          <img src={urlServer + item.avatar} alt="avatar" />
                          <p>
                            {item.name}
                            {item.size && ` - ${item.size}`}
                          </p>
                        </td>
                        <td className="td-center td-w-100px">
                          {item.quantity}
                        </td>
                        <td className="td-center td-w-100px">
                          {item.totalPrice}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="checkOut__item-orderIf">
            <p>
              Tạm Tính<span>{totalPriceOrder}VND</span>
            </p>
            <p>
              Phí Vận Chuyển<span>30000VND</span>
            </p>
            <p>
              Tổng Giá
              <span>{totalPriceOrder + 30000}VND</span>
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Link to={"/category"} className={"btn btn--black"}>
              TIẾP TỤC MUA HÀNG
            </Link>
            <button className="btn btn--red" onClick={() => handleSubmit()}>
              TIẾN HÀNH THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout1(CheckOut);
