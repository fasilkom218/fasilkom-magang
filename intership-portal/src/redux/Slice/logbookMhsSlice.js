import { createSlice } from "@reduxjs/toolkit";
import {
  addLogbookMhs,
  deleteLogbookMhs,
  getLogbookMhs,
  updateLogbookMhs,
} from "../Action/logbookMhsAction";

const initialState = {
  logbookMhs: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const logbookMhsSlice = createSlice({
  name: "logbookMhs",
  initialState,
  reducers: {
    resetLogbook: (state) => initialState,
  },
  extraReducers: (builder) => {
    // * Get Logbook Builder
    builder.addCase(getLogbookMhs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLogbookMhs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.logbookMhs = action.payload;
    });
    builder.addCase(getLogbookMhs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Add Logbook Builder
    builder.addCase(addLogbookMhs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addLogbookMhs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.logbookMhs = action.payload;
    });
    builder.addCase(addLogbookMhs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Update Logbook Builder
    builder.addCase(updateLogbookMhs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateLogbookMhs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    });
    builder.addCase(updateLogbookMhs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Delete Logbook builder
    builder.addCase(deleteLogbookMhs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteLogbookMhs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    });
    builder.addCase(deleteLogbookMhs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetLogbook } = logbookMhsSlice.actions;
export default logbookMhsSlice.reducer;
