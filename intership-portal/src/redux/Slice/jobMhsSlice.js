import { createSlice } from "@reduxjs/toolkit";
import {
  applyJob,
  getApply,
  getJob,
  getJobById,
} from "../Action/ApplyJobAction";

const initialState = {
  jobMhs: [],
  applied: [],
  isSuccess: false,
  sukses: false,
  isError: false,
  isLoading: false,
  message: "",
};

const jobMhsSlice = createSlice({
  name: "applyJob",
  initialState,
  reducers: {
    resetJob: (state) => initialState,
  },
  extraReducers: (builder) => {
    // * Get job builder
    builder.addCase(getJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJob.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.jobMhs = action.payload;
    });
    builder.addCase(getJob.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get job by id builder
    builder.addCase(getJobById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJobById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.jobMhs = action.payload;
    });
    builder.addCase(getJobById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get applications builder
    builder.addCase(getApply.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getApply.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.applied = action.payload;
    });
    builder.addCase(getApply.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Apply Job Builder
    builder.addCase(applyJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(applyJob.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sukses = true;
      state.applied = action.payload.data;
      state.message = action.payload.message;
    });
    builder.addCase(applyJob.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetJob } = jobMhsSlice.actions;
export default jobMhsSlice.reducer;
