import axiosAPI, { getToast } from "../../utils/InterceptorApi";

const addToWishlist = async (productId: string) => {
  try {
    const response = await axiosAPI.post(`/user/add-to-wishlist`, {
      productId,
    });
    getToast("success", response?.data?.message);
    return response.data;
  } catch (err) {
    getToast("error", err.response.data.message);
    return err;
  }
};

const getWishlist = async () => {
  try {
    const response = await axiosAPI.get(`/user/wishlist`);
    if (response.status === 200) return response.data;
  } catch (err) {
    return err;
  }
};

export const wishlistServices = {
  addToWishlist,
  getWishlist,
};
