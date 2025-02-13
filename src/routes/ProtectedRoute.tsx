import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../store/store";
import { current } from "@reduxjs/toolkit";
//  import Header from "../components/Header";
// import Sidebar from "../components/SideBar";
// import secureLocalStorage from "react-secure-storage";
/**
 * SecureLocalStorage is employed to enhance the security of the localStorage.
 */

/**
 * UseAuth function: Checks whether the token is present in the specified location.
 * @returns {boolean} True if the token is found, false otherwise.
 */

export const useAuth = () => {
  // const userdata = localStorage.getItem("access_token");

  const userdata = localStorage.getItem("access_token");
  const user = userdata ? { loggedIn: true } : { loggedIn: false };
  return user?.loggedIn;
};

// const encryptedToken22 = secureLocalStorage.getItem("auth");

/**
 * A general function for retrieving a token.
 */
export const getToken = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")
        }`,
    },
  };
};

// export const getToken = () => {
//   if(!ISSERVER) {
//   return{
//     headers: {
//       Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth"))}`
//     }
//   }
// }
// };
/**
 * A universal function to verify access to protected routes on the Routes page.
 */
export const ProtectedRouteCheck = () => {
  const isAuth = useAuth();
  // const isAuth = true
  // return isAuth ? <Navigate to="sideBar/Personal-Info" /> : children;
  return isAuth && <Navigate to="sideBar/home" />;
};

const ProtectedRoute = () => {
  let auth = useAuth();
  const { userProfile } = useSelector((state: RootState) => state.profile);
  const location = useLocation();
  const currentPath = location.pathname;
  const currentRole = userProfile?.role;
  const noUserAccess = ['/products/add'];
  const noVendorAccess = ['/cart', '/checkout']

  const isRouteAccessable = () => {
    if (currentRole === 'user') {
      return !noUserAccess.includes(currentPath)
    } else if (currentRole === 'vendor') {
      return !noVendorAccess.includes(currentPath)
    }
    return true
  }

  return auth && isRouteAccessable() ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
export default ProtectedRoute;
