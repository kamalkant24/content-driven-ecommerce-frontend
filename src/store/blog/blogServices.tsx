import blogs from "../../demoData/blogs.json";

const getBlogs = async () => {
  try {
    //   const response = await axiosAPI.get(`/user/blogs`);
    return blogs;
  } catch (err) {
    return err;
  }
};

const getBlog = async (id: string) => {
  try {
    //const response = await axiosAPI.get(`/user/blog/${id}`);
    const blog = blogs.find((blog) => blog.id === id);
    return blog;
  } catch (err) {
    return err;
  }
};

export const blogServices = { getBlogs, getBlog };
