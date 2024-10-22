import { createSlice } from "@reduxjs/toolkit";
import { getInfoMhs } from "../Action/InfoMhsAction";

const initialState = {
  infoMhs: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

const infoMhsSlice = createSlice({
  name: "infoMhs",
  initialState,
  reducers: {
    resetInfo: (state) => initialState,
  },
  extraReducers: (builder) => {
    // * Get Info Builder
    builder.addCase(getInfoMhs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInfoMhs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.infoMhs = action.payload;
    });
    builder.addCase(getInfoMhs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetInfo } = infoMhsSlice.actions;
export default infoMhsSlice.reducer;
