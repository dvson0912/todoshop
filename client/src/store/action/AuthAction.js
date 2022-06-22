import axios from "axios";
import { SET_LOADING, SET_USER, UPDATE_USER } from "../type";
import { urlServer } from "../URL";

export const register = (user, navigate) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  await axios
    .post(`${urlServer}/auth/register`, user)
    .then((result) => {
      dispatch({ type: SET_LOADING, payload: false });

      navigate("/user/login");
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};

export const login = (user, navigate) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  await axios
    .post(`${urlServer}/auth/login`, user, { withCredentials: true })
    .then((result) => {
      localStorage.setItem(
        "ACCESS_TOKEN",
        `bearer ${result.data.data.accessToken}`
      );
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: SET_USER, payload: result.data.data });
      navigate("/");
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};

export const reLogin = () => async (dispatch) => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  await axios
    .get(`${urlServer}/auth/re-login`, {
      headers: {
        token: token,
      },
      withCredentials: true,
    })
    .then((result) => {
      localStorage.setItem(
        "ACCESS_TOKEN",
        `bearer ${result.data.data.accessToken}`
      );
      dispatch({ type: SET_USER, payload: result.data.data });
    })
    .catch((err) => {
      alert(err.response.data.message);
      localStorage.removeItem("ACCESS_TOKEN");
    });
};

export const logout = (token, navigate) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  await axios
    .post(
      `${urlServer}/auth/logout`,
      {},
      {
        headers: {
          token: token,
        },

        withCredentials: true,
      }
    )
    .then((result) => {
      dispatch({ type: SET_LOADING, payload: true });

      dispatch({ type: SET_USER, payload: {} });
      localStorage.removeItem("ACCESS_TOKEN");
      navigate("/");
    })
    .catch((err) => alert(err.response.data.message));
};

export const updateInfo = (data, token, navigate) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    await axios
      .post(`${urlServer}/auth/update-info`, data, {
        headers: {
          token: `bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((result) => {
        alert("Cập Nhật Thông Tin Thành Công");
        dispatch({ type: SET_LOADING, payload: false });
        dispatch({ type: UPDATE_USER, payload: result.data.data });
        navigate("/user/profile");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = (data, token, navigate) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, payload: true });
    await axios
      .post(`${urlServer}/auth/update-password`, data, {
        headers: {
          token: `bearer ${token}`,
        },
        withCredentials: true,
      })
      .then((result) => {
        alert(result.data.message);
        dispatch({ type: SET_LOADING, payload: false });
        navigate("/user/profile");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
};
