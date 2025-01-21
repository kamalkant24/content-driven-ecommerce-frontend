import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addCarts, getAllCarts } from "./cartServices"


interface UsersState{
    error:string,
    cartsLoading:string,
    allCarts:any,
    status:string,
    addCart:any,
     }
     
     const initialState = {
       error:'',
       cartsLoading:'',
       allCarts:'',
       status:'',
       addCart:''
     } as UsersState
   

     export const addToCart: any| object|string= createAsyncThunk(
        "get/addCart",
        async(data:object)=>{
            try{
              const response  = await addCarts(data)
              return response.data
            }catch(err){
              return err
            }
          }
        )

        export const getAllCart: any| object|string= createAsyncThunk(
            "get/getCarts",
            async(data:object)=>{
                try{
                  const response  = await getAllCarts(data)
                  return response.data
                }catch(err){
                  return err
                }
              }
            )
            


        export const cartReducer=createSlice({
            name:'Cart',
            initialState,
            reducers:{
                reset:()=>initialState
              },
              extraReducers:(builder)=>{
                builder
                .addCase(addToCart.pending,(state)=>{
                  state.cartsLoading = "pending";
                  state.status='idle'
                })
                .addCase(addToCart.fulfilled,(state,action)=>{
                  state.cartsLoading= "succeeded";
                  state.status = '200';
                  state.addCart = action.payload;
                })
                .addCase(addToCart.rejected,(state)=>{
                  state.cartsLoading="failed";
                  state.status='500'
                  state.error="some thing went wrong"
                })
                .addCase(getAllCart.pending,(state)=>{
                    state.cartsLoading = "pending";
                    state.status='idle'
                  })
                  .addCase(getAllCart.fulfilled,(state,action)=>{
                    state.cartsLoading= "succeeded";
                    state.status = '200';
                    state.allCarts = action.payload;
                  })
                  .addCase(getAllCart.rejected,(state)=>{
                    state.cartsLoading="failed";
                    state.status='500'
                    state.error="some thing went wrong"
                  })
              }
        })

        export const {reset} = cartReducer.actions
        export default cartReducer.reducer