import axios from "axios";
import { GET_CATEGORY, GET_PRODUCT_BY_CATEGORY, SET_LOADING } from "../type";
import { urlServer } from "../URL";

export const createCategory = (data, navigate) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  const token = localStorage.getItem("ACCESS_TOKEN");
  await axios
    .post(`${urlServer}/category/create`, data, {
      headers: {
        token,
      },
      withCredentials: true,
    })
    .then((result) => {
      navigate("/admin/category");
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: GET_CATEGORY, payload: result.data.data });
    })
    .catch((err) => {
      dispatch({ type: SET_LOADING, payload: false });

      alert(err.response.data.message);
    });
};

export const getCategory = (page) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  await axios
    .get(`${urlServer}/category?page=${page}`)
    .then((result) => {
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: GET_CATEGORY, payload: result.data.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllCategory = () => async (dispatch) => {
  await axios
    .get(`${urlServer}/category/getall`, { withCredentials: true })
    .then((result) => {
      dispatch({ type: GET_CATEGORY, payload: result.data.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProductByCategory = (category) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  await axios
    .get(`${urlServer}/category/${category}`)
    .then((result) => {
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: GET_PRODUCT_BY_CATEGORY, payload: result.data.data });
    })
    .catch((err) => {
      alert(err);
    });
};

export const deleteCategoryById =
  (id, setIsDelete, isDelete) => async (dispatch) => {
    dispatch({ type: SET_LOADING, payload: true });
    const token = localStorage.getItem("ACCESS_TOKEN");
    await axios
      .post(
        `${urlServer}/category/delete`,
        { id },
        {
          headers: {
            token,
          },
          withCredentials: true,
        }
      )
      .then((result) => {
        dispatch({ type: SET_LOADING, payload: false });
        setIsDelete(!isDelete);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
