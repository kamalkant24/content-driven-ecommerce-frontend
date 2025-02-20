import { configureStore } from "@reduxjs/toolkit";
import loginDataReducer from "./authSlice/loginSlice";
import productDataReducer from "./productsSlice/userProductSlice";
import cartDataReducer from "./cartSlice/cartsSlice";
import userProfileReducer from "./user/userSlice";
import blogReducer from "./blog/blogSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    login: loginDataReducer,
    products: productDataReducer,
    cart: cartDataReducer,
    profile: userProfileReducer,
    blogs: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
