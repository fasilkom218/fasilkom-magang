import { createSlice } from "@reduxjs/toolkit";
import {
  getMagangReguler,
  getMagangRegulerById,
  updateMagangReguler,
} from "../Action/MagangRegulerAction";

const initialState = {
  magang: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: "",
};

const magangRegulerSlice = createSlice({
  name: "magangReguler",
  initialState,
  reducers: {
    resetReguler: (state) => initialState,
  },
  extraReducers: (builder) => {
    // * Get Magang Reguler Builder
    builder.addCase(getMagangReguler.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMagangReguler.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.magang = action.payload;
    });
    builder.addCase(getMagangReguler.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get Magang Reguler By Id Builder
    builder.addCase(getMagangRegulerById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMagangRegulerById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.magang = action.payload;
    });
    builder.addCase(getMagangRegulerById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Update Magang Reguler Builder
    builder.addCase(updateMagangReguler.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateMagangReguler.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(updateMagangReguler.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetReguler } = magangRegulerSlice.actions;
export default magangRegulerSlice.reducer;
