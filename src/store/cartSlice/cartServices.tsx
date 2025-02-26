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

const createPaymentIntent = async (payment: number) => {
  try {
    const data = { amount: Math.round(payment * 100) };
    const response = await axiosAPI.post(`/user/create-payment-intent`, data);
    return { clientSecret: response.data.clientSecret };
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const cartServices = {
  addCarts,
  getAllCarts,
  removeCartItem,
  setCheckoutDetails,
  createPaymentIntent,
};
