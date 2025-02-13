import axiosAPI, { getToast } from "../../utils/InterceptorApi";

const addCarts = async (data: any | object) => {
  try {
    const response = await axiosAPI.post(`/user/add-to-cart`, data);
    getToast("success", response?.data?.message);
    return response.data;
  } catch (err) {
    getToast("error", err.response.data.message);
    return err;
  }
};

const getAllCarts = async ({ search, page, limit }: any | object) => {
  try {
    const response = await axiosAPI.get(`/user/carts?search=${search}&page=${page}&pageSize=${limit}`);
    return response;
  } catch (err) {
    return err;
  }
};

const setCheckoutDetails = async (data: any | object) => {
  try {
    // const response = await axiosAPI.post(`/user/add-to-cart`, data);
    // getToast("success", response?.data?.message);
    // return response.data;
    return data;
  } catch (err) {
    // getToast("error", err.response.data.message);
    console.log(err);

    return err;
  }
};

export const cartServices = {
  addCarts,
  getAllCarts,
  setCheckoutDetails
}
