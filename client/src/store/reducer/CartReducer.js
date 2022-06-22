import {
  ADD_PRODUCT_TO_CART,
  CHANGE_QUANTITY_ITEM,
  DELETE_PRODUCT_CART,
  CHECKOUT,
  INCREASE_QUANTITY_ITEM,
  REDUCTION_QUANTITY_ITEM,
} from "../type";

const initialState = {
  cart: JSON.parse(localStorage.getItem("CART")) || [],
  checkOutProducts: [],
};

const CartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cart: payload,
      };

    case CHANGE_QUANTITY_ITEM:
      const newCart =
        state.cart &&
        state.cart.map((item) => {
          if (
            item._id === payload._id &&
            item.avatar === payload.avatar &&
            item.size === payload.size
          ) {
            return {
              ...item,
              quantity: payload.quantity,
              totalPrice: item.price * payload.quantity || 0,
            };
          }
          return item;
        });
      return {
        ...state,
        cart: newCart,
      };
    case INCREASE_QUANTITY_ITEM:
      const newData =
        state.cart &&
        state.cart.map((item) => {
          if (
            item._id === payload._id &&
            item.avatar === payload.avatar &&
            item.size === payload.size
          ) {
            console.log(item.quantity * item.price);

            return {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: (item.quantity + 1) * item.price || 0,
            };
          }
          return item;
        });
      return { ...state, cart: newData };
    case REDUCTION_QUANTITY_ITEM:
      const cartReduction =
        state.cart &&
        state.cart.map((item) => {
          if (
            item._id === payload._id &&
            item.avatar === payload.avatar &&
            item.size === payload.size
          ) {
            if (item.quantity - 1 !== 0) {
              return {
                ...item,
                quantity: item.quantity - 1,
                totalPrice: (item.quantity - 1) * item.price || 0,
              };
            } else {
              alert("Số Lượng Phải lơn Hớn 1");
              return item;
            }
          }
          return item;
        });
      return { ...state, cart: cartReduction };

    case DELETE_PRODUCT_CART:
      const CartDelete =
        state.cart &&
        state.cart.filter((item) => {
          if (
            item._id === payload._id &&
            item.avatar === payload.avatar &&
            item.size === payload.size
          ) {
            return false;
          }
          return true;
        });
      return {
        ...state,
        cart: CartDelete,
      };
    case CHECKOUT:
      return {
        ...state,
        checkOutProducts: payload,
      };
    default:
      return state;
  }
};

export default CartReducer;
