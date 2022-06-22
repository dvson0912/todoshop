import axios from "axios";
import {
  CREATE_SUCCESS,
  GET_PRODUCT_BY_TYPE,
  GET_TYPE,
  SET_LOADING,
} from "../type";
import { urlServer } from "../URL";

export const createType = (data, navigate, token) => async (dispatch) => {
  await axios
    .post(`${urlServer}/type/create`, data, {
      headers: { token: `bearer ${token}` },
      withCredentials: true,
    })
    .then((result) => {
      navigate("/admin/type");
    })
    .catch((err) => {
      dispatch({ type: CREATE_SUCCESS, payload: false });

      alert(err.response.data.message);
    });
};

export const getPageType = (page) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  await axios
    .get(`${urlServer}/type?page=${page}`)
    .then((result) => {
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: GET_TYPE, payload: result.data.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllType = () => async (dispatch) => {
  await axios
    .get(`${urlServer}/type/getall`)
    .then((result) => {
      dispatch({ type: GET_TYPE, payload: result.data.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteType =
  (id, setIsDelete, isDelete, token) => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    await axios
      .post(
        `${urlServer}/type/delete`,
        { id: id },
        { headers: { token: `bearer ${token}` }, withCredentials: true }
      )
      .then((result) => {
        dispatch({ type: SET_LOADING, payload: false });
        setIsDelete(!isDelete);
      })
      .catch((err) => alert(err.response.data.message));
  };

export const getProductsByType = (type, page) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  await axios
    .get(`${urlServer}/type/${type}?page=${page}`)
    .then((result) => {
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: GET_PRODUCT_BY_TYPE, payload: result.data.data });
    })
    .catch((err) => alert(err));
};
