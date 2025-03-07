import axiosAPI from "../../utils/InterceptorApi";

const getOrders = async (userId: string) => {
  try {
    const response = await axiosAPI.get(`/user/get-orders-by-user/${userId}`);
    if (response?.status == 200) {
      return response?.data;
    }
  } catch (err: any) {
    throw new Error(err?.response?.data?.error || "Something went wrong");
  }
};

const getOrderDetails = async (orderId: string) => {
  try {
    const response = await axiosAPI.get(`/user/get-order/${orderId}`);
    if (response?.status == 200) {
      return response?.data;
    }
  } catch (err: any) {
    throw new Error(
      err?.response?.data?.errorMessage || "Something went wrong"
    );
  }
};

export const orderServices = {
  getOrders,
  getOrderDetails,
};
