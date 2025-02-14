import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { cartServices } from "./cartServices"


interface UsersState {
  error: string,
  cartsLoading: string,
  allCarts: any,
  status: string,
  checkoutDetails: any,
}

const initialState = {
  error: '',
  cartsLoading: '',
  allCarts: '',
  status: '',
  checkoutDetails: '',
  paymentLoading: false
} as UsersState


export const addToCart: any | object | string = createAsyncThunk(
  "get/addCart",
  async (data: object) => {
    try {
      const response = await cartServices.addCarts(data);
      return response.data
    } catch (err) {
      return err
    }
  }
)

export const getAllCart: any | object | string = createAsyncThunk(
  "get/getCarts",
  async (data: object) => {
    try {
      const response = await cartServices.getAllCarts(data)
      return response.data
    } catch (err) {
      return err
    }
  }
)

export const setCheckoutDetails: any | object | string = createAsyncThunk(
  "set/setCheckoutDetails",
  async (data: object) => {
    try {
      const response = await cartServices.setCheckoutDetails(data);
      return response;
    } catch (err) {
      return err
    }
  }
)

export const createPaymentIntent: any | object | string = createAsyncThunk(
  "set/createPaymentIntent",
  async (payment: number) => {
    try {
      const response = await cartServices.createPaymentIntent(payment);
      return response;
    } catch (err) {
      return err
    }
  }
)


export const cartReducer = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.cartsLoading = "pending";
        state.status = 'idle'
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.cartsLoading = "succeeded";
        state.status = '200';
      })
      .addCase(addToCart.rejected, (state) => {
        state.cartsLoading = "failed";
        state.status = '500'
        state.error = "some thing went wrong"
      })
      .addCase(getAllCart.pending, (state) => {
        state.cartsLoading = "pending";
        state.status = 'idle'
      })
      .addCase(getAllCart.fulfilled, (state, action) => {
        state.cartsLoading = "succeeded";
        state.status = '200';
        state.allCarts = action.payload;
      })
      .addCase(getAllCart.rejected, (state) => {
        state.cartsLoading = "failed";
        state.status = '500'
        state.error = "some thing went wrong"
      })
      .addCase(setCheckoutDetails.pending, (state) => {
        // state.cartsLoading = "pending";
        // state.status = 'idle'
      })
      .addCase(setCheckoutDetails.fulfilled, (state, action) => {
        // state.cartsLoading = "succeeded";
        // state.status = '200';
        state.checkoutDetails = action.payload;
      })
      .addCase(setCheckoutDetails.rejected, (state) => {
        // state.cartsLoading = "failed";
        // state.status = '500'
        // state.error = "some thing went wrong"
      })
      .addCase(createPaymentIntent.pending, (state) => {
        // state.cartsLoading = "pending";
        // state.status = 'idle'
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        // state.cartsLoading = "succeeded";
        // state.status = '200';
        // state.checkoutDetails = action.payload;
      })
      .addCase(createPaymentIntent.rejected, (state) => {
        // state.cartsLoading = "failed";
        // state.status = '500'
        // state.error = "some thing went wrong"
      })
  }
})

export const { reset } = cartReducer.actions
export default cartReducer.reducer