import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderServices } from "./orderServices";

interface OrderState {
  orders: any;
  order: any;
  loading: boolean;
  error: any;
}

const initialState: OrderState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

export const getOrders = createAsyncThunk(
  "get/Orders",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await orderServices.getOrders(userId);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

export const getOrderDetails = createAsyncThunk(
  "get/order",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const response = await orderServices.getOrderDetails(orderId);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orders = action.payload?.orders;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;        
        state.order = action.payload?.order;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;        
        state.error = action.payload;
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
