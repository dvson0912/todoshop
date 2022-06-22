import { GET_ORDER, GET_ORDER_DETAILS, SET_USER, UPDATE_USER } from "../type";

const initialState = {
  user: {},
  order: {},
  orderDetails: {},
};

const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return { ...state, user: payload };

    case UPDATE_USER:
      const newUser = { ...state.user, ...payload };
      return { ...state, user: newUser };
    case GET_ORDER:
      return { ...state, order: payload };
    case GET_ORDER_DETAILS:
      console.log(payload);
      return { ...state, orderDetails: payload };
    default:
      return state;
  }
};
export default UserReducer;
