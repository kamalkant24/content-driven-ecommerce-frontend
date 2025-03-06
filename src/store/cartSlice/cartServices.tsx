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

const getAllCarts = async () => {
  try {
    const response = await axiosAPI.get(`/user/carts`);
    return response;
  } catch (err) {
    return err;
  }
};

const removeCartItem = async (id: string) => {
  try {
    const response = await axiosAPI.delete(`/user/remove-from-cart/${id}`);
    if (response?.status === 200) {
      getToast("success", response?.data?.message);
      return response.data;
    }
  } catch (err) {
    getToast("error", err.response.data.message);
    return err;
  }
};

const setItemCount = async (id: string, count: number) => {
  try {
    const body = {
      productId: id,
      count: count,
    };
    const response = await axiosAPI.post(`/user/update-cart`, body);
    if (response?.status === 200) {
      getToast("success", response?.data?.message);
      return response.data;
    }
  } catch (err: any) {
    getToast("error", err?.message);
    return err;
  }
};

const setCheckoutDetails = async (data: any | object) => {
  try {
    const response = await axiosAPI.post(`/user/checkout`, data);
    if (response?.status === 200) {
      return response;
    }
  } catch (err) {
    console.log(err);

    return err;
  }
};

const getCheckoutDetails = async (userId) => {
  try {
    const response = await axiosAPI.get(`/user/checkout/${userId}`);
    if (response?.status === 200) {
      return response.data;
    }
  } catch (err) {
    return;
  }
};

export const cartServices = {
  addCarts,
  getAllCarts,
  removeCartItem,
  setCheckoutDetails,
  setItemCount,
  getCheckoutDetails,
};
