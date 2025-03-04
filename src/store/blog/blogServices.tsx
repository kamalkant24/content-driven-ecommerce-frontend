import axiosAPI, { getToast } from "../../utils/InterceptorApi";

const getBlogs = async ({ page, pageSize, search, category, vendorId }) => {
  try {
    const response = await axiosAPI.get(
      `user/get-all-blogs?page=${page}&pageSize=${pageSize}&search=${search}&categories=${category}&vendorId=${vendorId}`
    );
    return response?.data;
  } catch (err) {
    throw new Error(err?.response?.data?.error || "Something went wrong");
  }
};

const getBlog = async (id: string) => {
  try {
    const response = await axiosAPI.get(`/user/get-all-blogby/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err?.response?.data?.error || "Something went wrong");
  }
};

const deleteBlog = async (id: string) => {
  try {
    const response = await axiosAPI.delete(`/user/delete-blog/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err?.response?.data?.error || "Something went wrong");
  }
};

const createBlog = async (blogData) => {
  try {
    const { title, content, image, tags, category } = blogData;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("categories", category);
    formData.append("image", image);
    formData.append("tags", tags);
    const response = await axiosAPI.post(`/user/create-blog`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    getToast("success", response.data.message);
    if (response?.status === 200) {
      return response?.data;
    }
    return response.data;
  } catch (err) {
    getToast("error", err?.response?.data?.error || "Something Went Wrong.");
    throw new Error(err?.response?.data?.error || "Something went wrong");
  }
};

const editBlog = async (blogData) => {
  try {
    const { title, content, image, tags, category, imagesToDelete, id } =
      blogData;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("categories", category);
    formData.append("image", image);
    formData.append("tags", tags);
    formData.append("imagesToDelete", imagesToDelete);
    const response = await axiosAPI.post(`/user/update-blogs/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (err) {
    getToast("error", err?.response?.data?.error || "Something Went Wrong.");
    throw new Error(err?.response?.data?.error || "Something went wrong");
  }
};

const likeBlog = async (id: string, doLike: boolean) => {
  try {
    const likeType = doLike ? "like" : "unlike";
    const response = await axiosAPI.post(
      `/user/${likeType}-blogs/${id}/${likeType}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err?.response?.data?.error || "Something went wrong");
  }
};

const commentBlog = async (data) => {
  try {
    const { commentJson, id } = data;
    const response = await axiosAPI.post(
      `/user/comment-blog/${id}`,
      commentJson
    );
    if (response.status === 200) {
      getToast("success", response.data.message);
    }
    return response?.data;
  } catch (err) {
    throw new Error(err?.response?.data?.error || "Something went wrong");
  }
};

export const blogServices = {
  getBlogs,
  getBlog,
  createBlog,
  deleteBlog,
  editBlog,
  likeBlog,
  commentBlog,
};
