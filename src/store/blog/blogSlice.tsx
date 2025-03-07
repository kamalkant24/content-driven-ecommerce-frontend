import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blogServices } from "./blogServices";

const initialState = {
  blogs: null,
  loading: false,
  error: null,
  blog: null,
};

export const getBlogsSlice = createAsyncThunk(
  "get/Blogs",
  async (filterData, { rejectWithValue }) => {
    try {
      const response = await blogServices.getBlogs(filterData);
      return response;
    } catch (err) {
      return rejectWithValue(
        err || "Something went wrong. Please try again later!"
      );
    }
  }
);

export const createBlogSlice = createAsyncThunk(
  "create/Blog",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await blogServices.createBlog(blogData);
      return response;
    } catch (err) {
      return rejectWithValue(
        err || "Something went wrong. Please try again later!"
      );
    }
  }
);

export const editBlogSlice = createAsyncThunk(
  "edit/Blog",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await blogServices.editBlog(blogData);
      return response;
    } catch (err) {
      return rejectWithValue(
        err || "Something went wrong. Please try again later!"
      );
    }
  }
);

export const getBlog = createAsyncThunk(
  "get/Blog",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await blogServices.getBlog(id);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const deleteBlogSlice = createAsyncThunk(
  "delete/Blog",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await blogServices.deleteBlog(id);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const likeBlogSlice = createAsyncThunk(
  "like/blog",
  async ({ id, doLike }, { rejectWithValue }) => {
    try {
      const response = await blogServices.likeBlog(id, doLike);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const addCommentSlice = createAsyncThunk(
  "add/comment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await blogServices.addComment(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const editCommentSlice = createAsyncThunk(
  "edit/comment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await blogServices.editComment(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const deleteCommentSlice = createAsyncThunk(
  "delete/comment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await blogServices.deleteComment(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const blogSlice = createSlice({
  name: "Blog",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogsSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogsSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.blogs = action.payload;
      })
      .addCase(getBlogsSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.blog = action?.payload?.data;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBlogSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlogSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createBlogSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteBlogSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlogSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.blogs = action?.payload;
      })
      .addCase(deleteBlogSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editBlogSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBlogSlice.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(editBlogSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likeBlogSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeBlogSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.blog = action?.payload?.data;
      })
      .addCase(likeBlogSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCommentSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCommentSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.blog = action?.payload?.data;
      })
      .addCase(addCommentSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCommentSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCommentSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.blog = action?.payload?.data;
      })
      .addCase(deleteCommentSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editCommentSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCommentSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.blog = action?.payload?.data;
      })
      .addCase(editCommentSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;
