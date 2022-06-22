import { combineReducers } from "redux";
import CartReducer from "./CartReducer";
import PostsReducer from "./PostsReducer";
import productReducer from "./ProductReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
  Products: productReducer,
  Posts: PostsReducer,
  User: UserReducer,
  Cart: CartReducer,
});

export default rootReducer;
