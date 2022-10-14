import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'


//register action
export const registerUserAction = createAsyncThunk(
    "users/register",
    async (user, { rejectWithValue, getState, dispatch }) => {
      try {
        //http call
        
        const { data } = await axiosInstance.post(
          `/api/users/register`,
          user,
        );
  
        return data;
      } catch (error) {
        if (!error && !error.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  //Login
export const loginUserAction = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue, getState, dispatch }) => {
      
      try {
        //make http call
        const { data } = await axiosInstance.post(
          `/api/users/login`,
          userData,
        
        );
  
        //save user into local storage
        localStorage.setItem("userInfo", JSON.stringify(data));
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  //Logout action
export const logoutAction = createAsyncThunk(
    "/user/logout",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        localStorage.removeItem("userInfo");
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

  //get user from local storage and place into store

const userLoginFromStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo"))
: null;

//slices
const userSlices=createSlice({
    name:'users',
    initialState:{
        userAuth:userLoginFromStorage,
    },
    reducers:{
        reset:(state)=>{
            state.loading=false
            state.appErr = undefined
            state.serverError = undefined

        }
    },
    extraReducers:(builder)=>{
        //register
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.appErr = undefined;
            state.serverError = undefined;
          });
          builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.registered = action?.payload;
            state.appErr = undefined;
            state.serverError = undefined;
          });
          builder.addCase(registerUserAction.rejected, (state, action) => {
            state.loading = false;
            state.appErr = action?.payload?.message;
            state.serverError = action?.error?.message;
          });

          //login
    builder.addCase(loginUserAction.pending, (state, action) => {
        state.loading = true;
        state.appErr = undefined;
        state.serverError = undefined;
      });
      builder.addCase(loginUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.userAuth = action?.payload;
        state.appErr = undefined;
        state.serverError = undefined;
      });
      builder.addCase(loginUserAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload;
        state.serverError = action?.error?.message;
      });

      //logout
    builder.addCase(logoutAction.pending, (state, action) => {
        state.loading = true;
        // state.appErr=undefined
        // state.serverError=undefined
      });
      builder.addCase(logoutAction.fulfilled, (state, action) => {
        state.userAuth = undefined;
        state.loading = undefined;
        state.loading = false;
        state.appErr = undefined;
        state.serverError = undefined;
      });
      builder.addCase(logoutAction.rejected, (state, action) => {
        state.appErr = action?.payload?.message;
        state.serverError = action?.error?.message;
        state.loading = false;
      });
      
    }
});
export const {reset}=userSlices.actions
export default userSlices.reducer