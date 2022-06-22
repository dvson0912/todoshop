import axios from "axios";
import {
  CREATE_SUCCESS,
  GET_PAGE_PRODUCTS,
  GET_PRODUCT_BY_NAME,
  SEARCH_PRODUCT,
  SET_LOADING,
} from "../type";
import { urlServer } from "../URL";

export const getProductByName = (link) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  await axios
    .get(`${urlServer}/product/${link}`)
    .then((result) => {
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: GET_PRODUCT_BY_NAME, payload: result.data.data });
    })
    .catch((err) => {
      alert(err);
    });
};

export const getPageProducts = (page) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  await axios
    .get(`${urlServer}/product?page=${page}`)
    .then((result) => {
      dispatch({ type: SET_LOADING, payload: false });
      dispatch({ type: CREATE_SUCCESS, payload: true });

      dispatch({ type: GET_PAGE_PRODUCTS, payload: result.data.data });
    })
    .catch((err) => {
      dispatch({ type: CREATE_SUCCESS, payload: false });
      alert(err.message);
      console.log(err);
    });
};

export const deleteProduct = (id) => async () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  await axios
    .post(
      `${urlServer}/product/delete`,
      { id },
      {
        headers: {
          token,
        },
        withCredentials: true,
      }
    )
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

export const searchProducts = (query) => async (dispatch) => {
  try {
    await axios
      .get(`${urlServer}/product/search?name=${query}`)
      .then((result) => {
        dispatch({ type: SEARCH_PRODUCT, payload: result.data.data });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  } catch (error) {
    console.log(error);
  }
};
