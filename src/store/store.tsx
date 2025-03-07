import { configureStore } from "@reduxjs/toolkit";
import loginDataReducer from "./authSlice/loginSlice";
import productDataReducer from "./productsSlice/userProductSlice";
import cartDataReducer from "./cartSlice/cartsSlice";
import userProfileReducer from "./user/userSlice";
import blogReducer from "./blog/blogSlice";
import wishlistReducer from "./wishlist/WishlistSlice";
import orderReducer from "./order/orderSlice";

const store = configureStore({
  reducer: {
    login: loginDataReducer,
    products: productDataReducer,
    cart: cartDataReducer,
    profile: userProfileReducer,
    blogs: blogReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
