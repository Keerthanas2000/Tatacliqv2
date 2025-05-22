  import { combineReducers, createStore } from "redux";
  import currentProduct from "./reducers/currentProduct";
  import cartReducer from "./reducers/cartReducer"; // Add this

  const rootReducer = combineReducers({
    currentProduct,
    cart: cartReducer, 
  });

  const store = createStore(rootReducer);

  export default store;
