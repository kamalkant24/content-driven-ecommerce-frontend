import { Navigate, Outlet } from "react-router-dom";
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
      Authorization: `Bearer ${
        localStorage.getItem("access_token")
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
  // return isAuth ? <Navigate to="sideBar/Personal-Info" /> : children;
  return isAuth && <Navigate to="sideBar/home" />;
};

const ProtectedRoute = () => {
  let auth = useAuth();
 
  return auth ? (
    <>
        <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};
export default ProtectedRoute;
