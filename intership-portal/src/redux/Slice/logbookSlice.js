import { createSlice } from "@reduxjs/toolkit";
import { getLogbook } from "../Action/LogbookAction";

const initialState = {
  logbook: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const logbookSlice = createSlice({
  name: "logbook",
  initialState,
  reducers: {
    resetLogbook: (state) => initialState,
  },
  extraReducers: (builder) => {
    // * Get Logbook
    builder.addCase(getLogbook.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLogbook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.logbook = action.payload;
    });
    builder.addCase(getLogbook.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetLogbook } = logbookSlice.actions;
export default logbookSlice.reducer;
