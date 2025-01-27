import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import loginService from "./loginService"

interface UsersState {
  isLoginError: boolean,
  isLoginLoading: string,
  isLoginSuccess: boolean,
  loginData: string,
  registerData: any,
  allUser: any,
  isUserLoading: string,
  isUserError: boolean,
  isUserSuccess: boolean,
}

const initialState = {
  isLoginError: false,
  isLoginLoading: "",
  isLoginSuccess: false,
  loginData: '',
  allUser: '',
  registerData: '',
  isUserLoading: "idle",
  isUserError: false,
  isUserSuccess: false
} as UsersState

export const loginAsync = createAsyncThunk(
  "post/login",
  async (data) => {
    try {
      const response = await loginService.login(data)
      return response.data;
    } catch (err) {
      return err
    }
  }
)

export const registerAsync = createAsyncThunk(
  "post/register",
  async (data: any) => {
    try {
      const response = await loginService.register(data)
      return response.data
    } catch (err) {
      return err
    }
  }
)

export const verifyAsync = createAsyncThunk(
  "post/verify",
  async (data: any) => {
    try {
      const response = await loginService.verify(data)
      return response.data
    } catch (err) {
      return err
    }
  }
)

export const allUserAsync = createAsyncThunk(
  "get/user",
  async (data: object) => {
    try {
      const response = await loginService.allUser(data)
      return response.data
    } catch (err) {
      return err
    }
  }
)

export const loginDataReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoginLoading = "pending";
        state.isLoginSuccess = false
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoginLoading = "succeeded";
        state.isLoginSuccess = true;
        state.loginData = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoginLoading = "failed";
        state.isLoginSuccess = false
      })
      .addCase(registerAsync.pending, (state) => {
        state.isLoginLoading = "pending";
        state.isLoginSuccess = false
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isLoginLoading = "succeeded";
        state.isLoginSuccess = true;
        state.registerData = action.payload
      })
      .addCase(registerAsync.rejected, (state) => {
        state.isLoginLoading = "failed";
        state.isLoginSuccess = false
      })
      .addCase(verifyAsync.pending, (state) => {
        state.isLoginLoading = "pending";
        state.isLoginSuccess = false
      })
      .addCase(verifyAsync.fulfilled, (state, action) => {
        state.isLoginLoading = "succeeded";
        state.isLoginSuccess = true;
        state.loginData = action.payload;
      })
      .addCase(verifyAsync.rejected, (state) => {
        state.isLoginLoading = "failed";
        state.isLoginSuccess = false
      })
      .addCase(allUserAsync.pending, (state) => {
        state.isUserLoading = "pending";
        state.isLoginSuccess = false
      })
      .addCase(allUserAsync.fulfilled, (state, action) => {
        state.isUserLoading = "succeeded";
        state.isLoginSuccess = true;
        state.allUser = action.payload
      })
      .addCase(allUserAsync.rejected, (state) => {
        state.isUserLoading = "failed";
        state.isLoginSuccess = false
      })
  }
})

export const { reset } = loginDataReducer.actions
export default loginDataReducer.reducer