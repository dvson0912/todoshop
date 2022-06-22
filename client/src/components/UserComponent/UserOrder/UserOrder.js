import moment from "moment";
import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../../store/action/OrderAction";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import Paginate from "../../Paginate/Paginate";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";

const UserOrder = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.User.order);
  const loading = useSelector((state) => state.Products.loading);

  useLayoutEffect(() => {
    dispacth(getOrder());
  }, [dispacth]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="order">
          <h3 className="order__heading">Danh Sách Đơn Hàng</h3>
          <div className="order__table">
            <table className="table">
              <thead>
                <tr>
                  <th>Mã Đơn Hàng</th>
                  <th>Giá</th>
                  <th>Trang Thái</th>
                  <th>Ngày Đặt</th>
                  <th>Xem</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(order.docs) &&
                  order.docs.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td className="td-center">{item._id}</td>
                        <td className="td-center">{item.totalPrice}VND</td>
                        <td className="td-center">{item.status}</td>

                        <td className="td-center">
                          {moment(item.createdAt).format("MMM Do YY")}
                        </td>
                        <td
                          style={{ cursor: "pointer" }}
                          className="td-center"
                          onClick={() => {
                            navigate(`order-details?id=${item._id}`);
                          }}
                        >
                          <AiOutlineMenuUnfold />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <Paginate currentPage={order.page} url={"user/profile/order"} />
        </div>
      )}
    </>
  );
};

export default UserOrder;
