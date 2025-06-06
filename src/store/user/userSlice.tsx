import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userServices";

interface UsersState {
  isLoginError: boolean;
  isLoginLoading: string;
  isLoginSuccess: boolean;
  userProfile: any;
  userConfirmed: string;
  loading: string;
  vendorList:
     {
        id: string;
        name: string;
      }[]
    | [];
}

const initialState = {
  isLoginError: false,
  isLoginLoading: "",
  isLoginSuccess: false,
  userProfile: "",
  userConfirmed: "",
  loading: "",
  vendorList: [],
} as UsersState;

export const getProfile = createAsyncThunk("get/userProfile", async (data) => {
  try {
    const response = await userService.getUserProfile(data);
    return response.data;
  } catch (err) {
    return err;
  }
});

export const getVendorListSlice = createAsyncThunk(
  "get/getVendorList",
  async () => {
    try {
      const response = await userService.getVendorList();
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const confirmation = createAsyncThunk(
  "post/confirmUser",
  async (data: any) => {
    try {
      const response = await userService.userConfirmedData(data);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const editUserSlice = createAsyncThunk(
  "put/editUserProfile",
  async (data: any) => {
    try {
      const response = await userService.editUserProfile(data);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

export const userProfileReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = "pending";
        state.isLoginSuccess = false;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.isLoginSuccess = true;
        state.userProfile = action.payload;
      })
      .addCase(getProfile.rejected, (state) => {
        state.loading = "failed";
        state.isLoginSuccess = false;
      })
      .addCase(getVendorListSlice.pending, (state) => {
        state.loading = "pending";
        state.isLoginSuccess = false;
      })
      .addCase(getVendorListSlice.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.isLoginSuccess = true;
        state.vendorList = action.payload;
      })
      .addCase(getVendorListSlice.rejected, (state) => {
        state.loading = "failed";
        state.isLoginSuccess = false;
      })
      // confirmed
      .addCase(confirmation.pending, (state) => {
        state.loading = "pending";
        state.isLoginSuccess = false;
      })
      .addCase(confirmation.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.isLoginSuccess = true;
        state.userConfirmed = action.payload;
      })
      .addCase(confirmation.rejected, (state) => {
        state.loading = "failed";
        state.isLoginSuccess = false;
      })

      // edit user
      .addCase(editUserSlice.pending, (state) => {
        state.loading = "pending";
        state.isLoginSuccess = false;
      })
      .addCase(editUserSlice.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.isLoginSuccess = true;
        // state.userProfile = action.payload;
      })
      .addCase(editUserSlice.rejected, (state) => {
        state.loading = "failed";
        state.isLoginSuccess = false;
      });
  },
});

export const { reset } = userProfileReducer.actions;
export default userProfileReducer.reducer;
