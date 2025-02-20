import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blogServices } from "./blogServices";

const initialState = {
  blogs: [],
  loading: false,
  error: null,
};

export const getBlogs = createAsyncThunk("get/Blogs", async () => {
  try {
    const response = await blogServices.getBlogs();
    return response;
  } catch (err) {
    return err;
  }
});

export const getBlog = createAsyncThunk("get/Blog", async (id: string) => {
  try {
    const response = await blogServices.getBlog(id);
    return response;
  } catch (err) {
    return err;
  }
});

export const blogSlice = createSlice({
  name: "Blog",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
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
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;
