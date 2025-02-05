import axiosAPI, { getToast } from "../../utils/InterceptorApi";

const login = async (data: any) => {
  try {
    const response: any = await axiosAPI.post("/user/login", data);
    response?.data?.token &&
      localStorage.setItem("access_token", response?.data?.token);
    if (response?.data?.code === 200) {
      getToast("success", response?.data?.message);
    } else {
      getToast("error", response?.data?.message);
    }
    return response;
  } catch (err: any) {
    getToast("error", err?.response?.data?.error);
    return err;
  }
};

const register = async (data: any) => {
  try {
    const response = await axiosAPI.post("/user/register", data);
    if (response?.data?.code === 200) {
      getToast("success", response?.data?.message);
    } else {
      getToast("error", response?.data?.message);
    }
    return response;
  } catch (err: any) {
    getToast("error", err?.response?.data?.error);
    return err;
  }
};

const verify = async (id: any) => {
  try {
    const response = await axiosAPI.get(`/user/verify/${id}`);        
    if (response?.data?.code === 200) {
      getToast("success", response?.data?.message);
    } else {
      getToast("error", response?.data?.message);
    }
    return response;
  } catch (err: any) {
    console.log(err);
    getToast("error", err?.response.data.message);
    return err;
  }
};

const allUser = async ({ page, pageSize, search }: object) => {

  try {
    const response = await axiosAPI.get(`/user/all?page=${page}&pageSize=${pageSize}&search=${search}`);
    if (response?.data?.code === 200) {
      getToast("success", response?.data?.message);
    }
    return response;
  } catch (err) {
    return err;
  }
};

const loginService = { login, register, verify, allUser };

export default loginService;
