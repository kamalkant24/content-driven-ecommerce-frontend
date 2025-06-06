import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import productService from './userProductServices'
import { Product } from "../../interface"

interface UsersState {
  error: string,
  productLoading: string,
  allProducts: any,
  status: string,
}

const initialState = {
  error: '',
  productLoading: '',
  allProducts: '',
  status: ''
} as UsersState



export const getAllProductSlice = createAsyncThunk(
  "get/allProducts",
  async (data: object, { rejectWithValue }) => {
    try {
      const response:any = await productService.getAllProducts(data);
      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }

      return response.data;
    } catch (err: any) {
      console.error("Error in Slice:", err);
      return rejectWithValue(err?.response?.data || "Something went wrong");
    }
  }
);

export const getAllProductsByVendorIdSlice = createAsyncThunk(
  "get/allProductsByVendorId",
  async (data: object, { rejectWithValue }) => {
    try {
      const response:any = await productService.getAllProductsByVendorId(data);
      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }
      return response.data;
    } catch (err: any) {
      console.error("Error in Slice:", err);
      return rejectWithValue(err?.response?.data || "Something went wrong");
    }
  }
);

export const getProductSlice: any | object | string = createAsyncThunk(
  "get/getProduct",
  async (id: string) => {
    try {
      const response: any = await productService.getProduct(id);
      return response.data
    } catch (err) {
      return err
    }
  }
)

export const addProductSlice: any | object | string = createAsyncThunk(
  "get/addProduct",
  async (data: Product) => {
    try {
      const response: any = await productService.addProduct(data)
      return response.data
    } catch (err) {
      return err
    }
  }
)

export const editProductSlice: any | object | string = createAsyncThunk(
  "get/editProduct",
  async (data: Product) => {
    try {
      const response: any = await productService.editProduct(data)
      return response.data
    } catch (err) {
      return err
    }
  }
)

export const deleteProductSlice: any | object | string = createAsyncThunk(
  "get/deleteProduct",
  async (id: string) => {
    try {
      const response: any = await productService.deleteProduct(id);
      return response
    } catch (err) {
      return err
    }
  }
)


export const productReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductSlice.pending, (state) => {
        state.productLoading = "pending";
        state.status = 'idle'
      })
      .addCase(getAllProductSlice.fulfilled, (state, action) => {
        state.productLoading = "succeeded";
        state.status = '200';
        state.allProducts = action.payload;
      })
      .addCase(getAllProductSlice.rejected, (state) => {
        state.productLoading = "failed";
        state.status = '500'
        state.error = "something went wrong"
      })
      .addCase(getAllProductsByVendorIdSlice.pending, (state) => {
        state.productLoading = "pending";
        state.status = 'idle'
      })
      .addCase(getAllProductsByVendorIdSlice.fulfilled, (state, action) => {
        state.productLoading = "succeeded";
        state.status = '200';
        state.allProducts = action.payload;
      })
      .addCase(getAllProductsByVendorIdSlice.rejected, (state) => {
        state.productLoading = "failed";
        state.status = '500'
        state.error = "something went wrong"
      })
      .addCase(getProductSlice.pending, (state) => {
        state.productLoading = "pending";
        state.status = 'idle'
      })
      .addCase(getProductSlice.fulfilled, (state, action) => {
        state.productLoading = "succeeded";
        state.status = '200';
      })
      .addCase(getProductSlice.rejected, (state) => {
        state.productLoading = "failed";
        state.status = '500'
        state.error = "something went wrong"
      })
      .addCase(addProductSlice.pending, (state) => {
        state.productLoading = "pending";
        state.status = 'idle'
      })
      .addCase(addProductSlice.fulfilled, (state, action) => {
        state.productLoading = "succeeded";
        state.status = '200';
      })
      .addCase(addProductSlice.rejected, (state) => {
        state.productLoading = "failed";
        state.status = '500'
        state.error = "something went wrong"
      })
      .addCase(editProductSlice.pending, (state) => {
        state.productLoading = "pending";
        state.status = 'idle'
      })
      .addCase(editProductSlice.fulfilled, (state, action) => {
        state.productLoading = "succeeded";
        state.status = '200';
      })
      .addCase(editProductSlice.rejected, (state) => {
        state.productLoading = "failed";
        state.status = '500'
        state.error = "something went wrong"
      })
      .addCase(deleteProductSlice.pending, (state) => {
        state.productLoading = "pending";
        state.status = 'idle'
      })
      .addCase(deleteProductSlice.fulfilled, (state, action) => {
        state.productLoading = "succeeded";
        state.status = '200';
        const updatedProducts = state.allProducts.data.filter((product) => product?._id !== action?.payload);
        state.allProducts.data = updatedProducts;
      })
      .addCase(deleteProductSlice.rejected, (state) => {
        state.productLoading = "failed";
        state.status = '500'
        state.error = "something went wrong"
      })
  }
})

export const { reset } = productReducer.actions
export default productReducer.reducer