import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getOrderDetails, undoOrder } from "../../../store/action/OrderAction";
import moment from "moment";
import { urlServer } from "../../../store/URL";
import TranslateLink from "../../../hooks/translateLink";
import Loading from "../../Loading/Loading";

const OrderDetails = () => {
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const { order, orderDetails } = useSelector(
    (state) => state.User.orderDetails
  );
  const loading = useSelector((state) => state.Products.loading);
  const local = useLocation();
  const id = local && local.search.split("?id=")[1];
  useLayoutEffect(() => {
    dispacth(getOrderDetails(id));
  }, [dispacth, id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="orderDetails">
          <h2 className="orderDetails__heading">
            <span>
              Chi tiết đơn hàng #{order && order._id} -
              <span style={{ fontWeight: 600 }}> {order && order.status}</span>
            </span>
            <span className="orderDetails__heading-date">
              Ngày Đặt Hàng:
              {order && moment(order.createdAt).format(" LT L")}
            </span>
          </h2>
          <div className="orderDetails__info">
            <div className="orderDetails__info__item">
              <h3 className="orderDetails__info__item-heading">
                Địa Chỉ Người Nhận
              </h3>
              <div className="orderDetails__info__item-body">
                <h4>{order && order.name}</h4>
                <p>Địa Chỉ:{order && order.address}</p>
                <p>Điện Thoại:{order && order.phone}</p>
              </div>
            </div>
            <div className="orderDetails__info__item">
              <h3 className="orderDetails__info__item-heading">
                Hình Thức Thanh Toán
              </h3>
              <div className="orderDetails__info__item-body">
                <p>Thanh toán tiền mặt khi nhận hàng</p>
              </div>
            </div>
          </div>
          <div className="orderDetails__content">
            <h3 className="orderDetails__content__heading">Sản Phẩm</h3>
            <div className="orderDetails__content__body">
              {orderDetails &&
                orderDetails.map((item) => {
                  return (
                    <div
                      className="orderDetails__content__body__item"
                      key={item._id}
                    >
                      <img src={urlServer + item.avatar} alt="" />
                      <div lassName="orderDetails__content__body__item-info">
                        <Link
                          to={`/products/${TranslateLink(item.nameProduct)}`}
                        >
                          {item.nameProduct}
                          {item.size && ` - ${item.size}`}
                        </Link>
                        <p>Số Lượng : {item.quantity}</p>
                        <p>Tổng : {item.totalPrice}VND</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="orderDetails__money">
            <p className="orderDetails__money__price">
              Tạm Tính : <span>{order && order.totalPrice}VND</span>
            </p>
            <p className="orderDetails__money__price">
              Phí Vận Chuyện : <span>30000VND</span>
            </p>
            <p className="orderDetails__money__price">
              Thành Tiền :{" "}
              <span className="orderDetails__money__price--red">
                {order && order.totalPrice + 30000}VND
              </span>
            </p>
          </div>
          <div className="orderDetails__knot">
            <button
              className={`btn btn--black ${
                order && order.status === "Đã Hủy" ? "btn--disabled" : ""
              }`}
              onClick={() => {
                if (order.status !== "Đã Hủy") {
                  dispacth(undoOrder(order._id, navigate));
                }
              }}
            >
              Hủy Đơn Hàng
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
