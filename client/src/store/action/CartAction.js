import { ADD_PRODUCT_TO_CART, CHECKOUT } from "../type";

export const addProductToCart = (item, cart) => (dispatch) => {
  const test =
    cart &&
    cart.find((product) => {
      if (
        product._id === item._id &&
        product.avatar === item.avatar &&
        product.size === item.size
      ) {
        return true;
      }
      return false;
    });
  if (test) {
    const newCart =
      cart &&
      cart.map((product) => {
        if (
          product._id === item._id &&
          product.avatar === item.avatar &&
          product.size === item.size
        ) {
          return {
            ...product,
            quantity: product.quantity + item.quantity,
            totalPrice: product.price * (product.quantity + item.quantity) || 0,
          };
        }
        return product;
      });

    dispatch({ type: ADD_PRODUCT_TO_CART, payload: newCart });
  } else {
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      payload: [
        ...cart,
        { ...item, totalPrice: item.price * item.quantity || 0 },
      ],
    });
  }
};

export const CheckOut = (products, navigate) => (dispatch) => {
  navigate("/checkOut");
  dispatch({
    type: CHECKOUT,
    payload: products,
  });
};
