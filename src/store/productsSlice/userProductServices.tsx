import { Product } from "../../interface";
import axiosAPI, { getToast } from "../../utils/InterceptorApi";

const getAllProducts = async ({ page, pageSize, search }: any | object) => {
  try {
    // const response = await axiosAPI.get(`/user/get-all-produts?page=${page}&pageSize=${pageSize}&search=${search}`);
    const response = await axiosAPI.get(
      `/user/get-all-products?page=${page}&pageSize=${pageSize}&search=${search}&category=&vendor=&minPrice=&maxPrice=&sortByPrice=high-to-low`
    );

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
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("category", product.category);
    formData.append("availability", product.availability);
    product.images.forEach((image, index) => {
      formData.append("image", image, image.name);
    });
    const response = await axiosAPI.post(`/user/create-products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

const editProduct = async (product: Product) => {
  try {
    const formData = new FormData();
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("category", product.category);
    formData.append("availability", product.availability);
    formData.append("image", product?.images);
    // product.images.forEach((image, index) => {
    //   console.log(typeof image)
    //   formData.append('image', image, image.name);
    // });
    const response = await axiosAPI.put(
      `/user/update-product/${product._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
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
    return id;
  } catch (err) {
    return err;
  }
};

const productService = {
  getAllProducts,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
};
export default productService;
