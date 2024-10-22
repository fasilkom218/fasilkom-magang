import { createSlice } from "@reduxjs/toolkit";
import {
  addJob,
  deleteJob,
  editJob,
  getJob,
  getJobId,
} from "../Action/CreateJobAction";

const initialState = {
  job: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const createJobSlice = createSlice({
  name: "createJob",
  initialState,
  reducers: {
    resetJob: (state) => initialState,
  },
  extraReducers: (builder) => {
    // Get job builder
    builder.addCase(getJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJob.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.job = action.payload;
    });
    builder.addCase(getJob.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Get job by id builder
    builder.addCase(getJobId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJobId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.job = action.payload;
    });
    builder.addCase(getJobId.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Create job builder
    builder.addCase(addJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addJob.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.job = action.payload;
    });
    builder.addCase(addJob.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Edit job builder
    builder.addCase(editJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editJob.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.job = action.payload;
    });
    builder.addCase(editJob.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Delete Builder
    builder.addCase(deleteJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteJob.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.job = action.payload;
    });
    builder.addCase(deleteJob.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetJob } = createJobSlice.actions;
export default createJobSlice.reducer;
