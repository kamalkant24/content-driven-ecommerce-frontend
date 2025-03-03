import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Wishlist } from "../../interface";
import { wishlistServices } from "./wishlistService";

interface initialState {
  wishlist: Wishlist;
  loading: boolean;
  error: null | string;
}

const initialState = {
  wishlist: {},
  loading: false,
  error: null,
};

export const addToWishlistSlice = createAsyncThunk(
  "post/addWishlist",
  async (productId: string) => {
    try {
      const response = await wishlistServices.addToWishlist(productId);
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const removeFromWishlistSlice = createAsyncThunk(
  "delete/removeFromWishlist",
  async (productId: string) => {
    try {
      const response = await wishlistServices.removeFromWishlist(productId);
      return response;
    } catch (err) {
      return err;
    }
  }
);

export const getWishlistSlice = createAsyncThunk("get/wishlist", async () => {
  try {
    const response = await wishlistServices.getWishlist();
    return response;
  } catch (err) {
    return err;
  }
});

export const wishlistSlice = createSlice({
  name: "Wishlist",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlistSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlistSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.wishlist = action?.payload?.wishlist;
      })
      .addCase(addToWishlistSlice.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromWishlistSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlistSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;        
        state.wishlist = action?.payload?.wishlist;
      })
      .addCase(removeFromWishlistSlice.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getWishlistSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlistSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.wishlist = action?.payload?.wishlist;
      })
      .addCase(getWishlistSlice.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = wishlistSlice.actions;
export default wishlistSlice.reducer;
