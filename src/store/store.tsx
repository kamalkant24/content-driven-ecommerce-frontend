import { configureStore } from "@reduxjs/toolkit";
import loginDataReducer from "./authSlice/loginSlice";
import productDataReducer from "./productsSlice/userProductSlice";
import  cartDataReducer  from "./cartSlice/cartsSlice";
import  userProfileReducer  from "./user/userSlice";


const store = configureStore({
  reducer: {
    login: loginDataReducer,
    products:productDataReducer,
    cart:cartDataReducer,
    profile:userProfileReducer,
  },
});

export default store;
