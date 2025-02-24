// Importing necessary modules and components
import axios from "axios";
import { toast } from "react-toastify";
import { logout } from "./helpers";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosAPI = axios.create({
  baseURL: BASE_URL,
});

/**
 * Interceptor to append the bearer token to the header in outgoing requests.
 */
axiosAPI.interceptors.request.use(
  (config: any) => {
    // Retrieve the access token from secure local storage
    const userdata = localStorage.getItem("access_token");
    // If an access token is available, add it to the request headers

    if (userdata && !config?.token) {
      config.headers["Authorization"] = `Bearer ${userdata}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log({ errorInInterceptor: error.response.status });
    console.log('herreee', error.response);
    
    if (error.response && error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

export const getToast = (type: string, message: string) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    default:
  }
};
// Export the configured axios instance
export default axiosAPI;
