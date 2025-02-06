import axiosAPI, { getToast } from "../../utils/InterceptorApi";
import bcrypt from 'bcryptjs';

const login = async (data: any) => {
  try {
    const { email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const body = {
      email,
      // password: hashedPassword
      password
    }
    const response: any = await axiosAPI.post("/user/login", body);
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
    const { name, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const body = {
      name,
      email,
      // password: hashedPassword
      password
    }
    const response = await axiosAPI.post("/user/register", body);
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
