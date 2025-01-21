// Importing necessary modules and components from React and React Router
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AllUsers from "../pages/allUser/AllUsers";
import Products from "../pages/products/Products";
import Cart from "../pages/cart/Cart";
import UserBlogs from "../pages/blogs/UserBlogs";
import TestPage from "../pages/cart/TestPage";
import UserProfile from "../pages/profile/UserProfile";
import ProductView from "../pages/products/ProductView";
import Setting from "../pages/settingPage/Setting";
// import TextEditor from "../components/TextEditor";
import TextEditor from "../components/NewTextEditor";

export default function RouteFile() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/home" element={<AllUsers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/carts" element={<Cart />} />
          <Route path="/blogs" element={<UserBlogs />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/product-view" element={<ProductView />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/pricing" element={<TextEditor />} />
        </Route>
      </Routes>
    </>
  );
}
