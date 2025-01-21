import axiosAPI, { getToast } from "../../utils/InterceptorApi";

export const getAllProducts = async ({page,pageSize,search}:any|object) => {

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

