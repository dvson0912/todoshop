import axios from "axios";
import { GET_ORDER, GET_ORDER_DETAILS, SET_LOADING } from "../type";
import { urlServer } from "../URL";

export const Pay = (data, navigate) => async (dispatch) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    axios
      .post(`${urlServer}/order/add-order`, data, {
        headers: {
          token: token,
        },
        withCredentials: true,
      })
      .then((result) => {
        alert(result.data.message);
        navigate("/user/profile/order");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    alert(error);
  }
};

export const getOrder =
  (page = 1) =>
  async (dispacth) => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      dispacth({ type: SET_LOADING, payload: true });
      axios
        .get(`${urlServer}/order/get-order?page=${page}`, {
          headers: {
            token: token,
          },
          withCredentials: true,
        })
        .then((result) => {
          dispacth({ type: SET_LOADING, payload: false });
          dispacth({ type: GET_ORDER, payload: result.data.data });
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

export const getOrderDetails = (id) => async (dispacth) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    dispacth({ type: SET_LOADING, payload: true });
    axios
      .get(`${urlServer}/order/get-orderdetails?id=${id}`, {
        headers: {
          token,
        },
        withCredentials: true,
      })
      .then((result) => {
        dispacth({ type: SET_LOADING, payload: false });

        dispacth({ type: GET_ORDER_DETAILS, payload: result.data.data });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

export const undoOrder = (id, navigate) => async (dispacth) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    console.log(token);
    axios
      .post(
        `${urlServer}/order/undo-order?id=${id}`,
        {},
        {
          headers: {
            token,
          },
          withCredentials: true,
        }
      )
      .then((result) => {
        alert("Hủy Đơn Hàng Thành Công");
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
};
