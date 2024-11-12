import { createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  deleteComment,
  getComments,
  replyComment,
} from "./comments.service";

const initialState = {
  comments: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMsg: "",
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // add comment
    builder
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMsg = "";
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });

    //get comments
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });

    //delete comments
    builder
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload;
        console.log("action get payload : ", action.payload);
      });

    // reply comments
    builder
      .addCase(replyComment.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.errorMsg = "";
      })
      .addCase(replyComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.comments.push(action.payload);
      })
      .addCase(replyComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export default commentSlice.reducer;
export const selectComments = (state) => state.comments;
