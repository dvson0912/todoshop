import {
  CREATE_SUCCESS,
  GET_TYPE,
  GET_CATEGORY,
  GET_PRODUCT_BY_NAME,
  SET_LOADING,
  GET_PAGE_PRODUCTS,
  GET_PRODUCT_BY_CATEGORY,
  GET_PRODUCT_BY_TYPE,
  SEARCH_PRODUCT,
} from "../type";

const productInitialState = {
  products: [],
  product: [],
  searchProducts: [],
  relatedProducts: [],
  categorys: [],
  types: [],
  loading: false,
  success: false,
};

const productReducer = (state = productInitialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCT_BY_NAME:
      return {
        ...state,
        product: payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        categorys: payload,
      };
    case GET_TYPE:
      return {
        ...state,
        types: payload,
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        success: payload,
      };
    case GET_PAGE_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case GET_PRODUCT_BY_CATEGORY:
      return {
        ...state,
        products: payload,
      };
    case GET_PRODUCT_BY_TYPE:
      return {
        ...state,
        products: payload,
      };
    case SEARCH_PRODUCT:
      return {
        ...state,
        searchProducts: payload,
      };
    default:
      return state;
  }
};

export default productReducer;
