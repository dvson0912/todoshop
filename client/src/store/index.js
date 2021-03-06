import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const middle = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middle));

export default store;
