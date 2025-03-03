import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Products from "../pages/products/Products";
import Cart from "../pages/cart/Cart";
import Blogs from "../pages/blogs/Blogs";
import UserProfile from "../pages/profile/UserProfile";
import Setting from "../pages/settingPage/Setting";
import { AddProduct } from "../pages/addProduct/AddProduct";
import { ProductDetails } from "../pages/productDetails/ProductDetails";
import NotFound from "../pages/notFound/NotFound";
import { Checkout } from "../pages/checkout/Checkout";
import { Orders } from "../pages/orders/Orders";
import { CreateBlog } from "../pages/createBlog/CreateBlog";
import { BlogDetails } from "../pages/blogDetails/BlogDetails";
import { Wishlist } from "../pages/wishlist/Wishlist";

export default function RouteFile() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/edit/:id" element={<AddProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/blogs/create" element={<CreateBlog />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
