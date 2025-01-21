import axiosAPI, { getToast } from "../../utils/InterceptorApi";

const getUserProfile = async (data: any) => {
  try {
    const response: any = await axiosAPI.get("/user/user-profile");

    return response;
  } catch (err: any) {
    getToast("error", err?.response?.data?.error);
    return err;
  }
};

const userConfirmedData = async (data: any) => {
  try {
    const response: any = await axiosAPI.post("/user/confirmation", data);

    return response;
  } catch (err: any) {
    getToast("error", err?.response?.data?.error);
    return err;
  }
};

const userService = { getUserProfile, userConfirmedData };

export default userService;
