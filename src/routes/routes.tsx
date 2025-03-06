import { AddProduct } from "../pages/addProduct/AddProduct";
import { BlogDetails } from "../pages/blogDetails/BlogDetails";
import Blogs from "../pages/blogs/Blogs";
import Cart from "../pages/cart/Cart";
import { Checkout } from "../pages/checkout/Checkout";
import { CreateBlog } from "../pages/createBlog/CreateBlog";
import { Orders } from "../pages/orders/Orders";
import { PaymentStatus } from "../pages/paymentStatus/PaymentStatus";
import { ProductDetails } from "../pages/productDetails/ProductDetails";
import Products from "../pages/products/Products";
import UserProfile from "../pages/profile/UserProfile";
import Setting from "../pages/settingPage/Setting";
import { Wishlist } from "../pages/wishlist/Wishlist";

export const routes = [
  { path: "/products", element: <Products /> },
  { path: "/cart", element: <Cart /> },
  { path: "/blogs", element: <Blogs /> },
  { path: "/profile", element: <UserProfile /> },
  { path: "/setting", element: <Setting /> },
  { path: "/products/add", element: <AddProduct /> },
  { path: "/products/:id", element: <ProductDetails /> },
  { path: "/products/edit/:id", element: <AddProduct /> },
  { path: "/checkout", element: <Checkout /> },
  { path: "/orders", element: <Orders /> },
  { path: "/blogs/create", element: <CreateBlog /> },
  { path: "/blogs/:id", element: <BlogDetails /> },
  { path: "/blogs/edit/:id", element: <CreateBlog /> },
  { path: "/wishlist", element: <Wishlist /> },
  { path: "/payment/:type", element: <PaymentStatus /> },
];
