import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {getAllProducts} from './userProductServices'

interface UsersState{
 error:string,
 productLoading:string,
 allProducts:any,
 status:string,
  }
  
  const initialState = {
    error:'',
    productLoading:'',
    allProducts:'',
    status:''
  } as UsersState




  export const getAllProductSlice: any| object|string = createAsyncThunk(
    "get/allProducts",
    async(data:object)=>{
      try{
        const response  = await getAllProducts(data)
        return response.data
      }catch(err){
        return err
      }
    }
    )


    export const productReducer= createSlice({
        name:"products",
        initialState,
        reducers:{
          reset:()=>initialState
        },
        extraReducers:(builder)=>{
          builder
          .addCase(getAllProductSlice.pending,(state)=>{
            state.productLoading = "pending";
            state.status='idle'
          })
          .addCase(getAllProductSlice.fulfilled,(state,action)=>{
            state.productLoading= "succeeded";
            state.status = '200';
            state.allProducts = action.payload;
          })
          .addCase(getAllProductSlice.rejected,(state)=>{
            state.productLoading="failed";
            state.status='500'
            state.error="some thing went wrong"
          })
        }
    })

    export const {reset} = productReducer.actions
export default productReducer.reducer