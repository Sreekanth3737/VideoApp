import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";


//fetch all posts
export const fetchPostsAction = createAsyncThunk(
    "post/list",
    async (video, { rejectWithValue, getState, dispatch }) => {
      try {
        const { data } = await axiosInstance.get(
          `/api/video/get-all-video`
        );
        return data;
      } catch (error) {
        if (!error?.response) throw error;
        return rejectWithValue(error?.response?.data);
      }
    }
  );


  const postSlice = createSlice({
    name: "post",
    initialState: { },
    reducers: {
        setVideo: (state, action) => {
            state.selectedPlayer = action.payload
          }
      },

    extraReducers:(builder)=>{
      //fetch posts
    builder.addCase(fetchPostsAction.pending,(state,action)=>{
        state.loading=true;
        
      });
      builder.addCase(fetchPostsAction.fulfilled,(state,action)=>{
         state.postLists=action?.payload;      
        state.loading=false;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(fetchPostsAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serverErr = action?.error?.message;
      });  
    }

  })
  export const { setVideo } = postSlice.actions;

  export default postSlice.reducer;