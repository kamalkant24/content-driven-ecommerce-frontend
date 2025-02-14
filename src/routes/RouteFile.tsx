import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Products from "../pages/products/Products";
import Cart from "../pages/cart/Cart";
import UserBlogs from "../pages/blogs/UserBlogs";
import UserProfile from "../pages/profile/UserProfile";
import ProductView from "../pages/products/ProductView";
import Setting from "../pages/settingPage/Setting";
import { Chat } from "../pages/chat/Chat";
import { AddProduct } from "../pages/addProduct/AddProduct";
import { ProductDetails } from "../pages/productDetails/ProductDetails";
import NotFound from "../pages/notFound/NotFound";
import { Checkout } from "../pages/checkout/Checkout";
import { Orders } from "../pages/orders/Orders";

export default function RouteFile() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blogs" element={<UserBlogs />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/product-view" element={<ProductView />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/edit/:id" element={<AddProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
