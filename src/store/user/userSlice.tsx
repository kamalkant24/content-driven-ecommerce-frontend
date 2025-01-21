import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import userService from "./userServices"


interface UsersState{
  isLoginError:boolean,
  isLoginLoading:string,
  isLoginSuccess:boolean,
  userProfile:string,
  userConfirmed:string,
  loading:string

}

const initialState = {
  isLoginError:false,
  isLoginLoading:"",
  isLoginSuccess:false,
  userProfile:'',
  userConfirmed:'',
  loading:''

} as UsersState

export const getProfile = createAsyncThunk(
  "get/useProfile",
  async(data)=>{
    try{
      const response = await userService.getUserProfile(data)
      return response.data;
    }catch(err){
      return err
    }
  }
)

export const confirmation = createAsyncThunk(
    "post/confirmUser",
    async(data)=>{
      try{
        const response = await userService.userConfirmedData(data)
        return response.data;
      }catch(err){
        return err
      }
    }
  )

export const userProfileReducer = createSlice({
  name:"user",
  initialState,
  reducers:{
    reset:()=>initialState
  },
  extraReducers:(builder)=>{
    builder
    .addCase(getProfile.pending,(state)=>{
      state.loading = "pending";
      state.isLoginSuccess=false
    })
    .addCase(getProfile.fulfilled,(state,action)=>{
      state.loading= "succeeded";
      state.isLoginSuccess = true;
      state.userProfile = action.payload;
    })
    .addCase(getProfile.rejected,(state)=>{
      state.loading="failed";
      state.isLoginSuccess=false
    })


// confirmed
.addCase(confirmation.pending,(state)=>{
    state.loading = "pending";
    state.isLoginSuccess=false
  })
  .addCase(confirmation.fulfilled,(state,action)=>{
    state.loading= "succeeded";
    state.isLoginSuccess = true;
    state.userConfirmed = action.payload;
  })
  .addCase(confirmation.rejected,(state)=>{
    state.loading="failed";
    state.isLoginSuccess=false
  })



  }
})

export const {reset} = userProfileReducer.actions
export default userProfileReducer.reducer