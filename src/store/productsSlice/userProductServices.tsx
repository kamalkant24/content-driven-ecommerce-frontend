import { Product } from "../../interface";
import axiosAPI, { getToast } from "../../utils/InterceptorApi";

const getAllProducts = async ({ page, pageSize, search }: any | object) => {
  try {
    const response = await axiosAPI.get(`/user/get-all-produts?page=${page}&pageSize=${pageSize}&search=${search}`);
    if (response?.data?.code === 200) {
      getToast("success", response?.data?.message);
    }
    return response;
  } catch (err) {
    return err;
  }
};

const getProduct = async (id: string) => {
  try {
    const response = await axiosAPI.get(`/user/get-product/${id}`);
    return response;
  } catch (err) {
    return err;
  }
};

const addProduct = async (product: Product) => {
  try {
    console.log(product);
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    product.images.forEach((image, index) => {
      formData.append('image', image, image.name);
    });
    const response = await axiosAPI.post(`/user/create-products`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      getToast("success", response?.data?.message);
    }
    return response;
  } catch (err) {
    console.error("Error adding product:", err);
    getToast("error", err?.message);
    return err;
  }
};

const deleteProduct = async (id: string) => {
  try {
    const response = await axiosAPI.delete(`/user/delete-product/${id}`);
    if (response.status === 200) {
      getToast("success", response?.data?.message);
    }    
    return id
  } catch (err) {
    return err;
  }
};

const productService = { getAllProducts, getProduct, addProduct, deleteProduct };
export default productService;
