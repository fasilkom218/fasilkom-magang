import { createSlice } from "@reduxjs/toolkit";
import {
  addInfo,
  deleteInfo,
  editInfo,
  getInfo,
  getInfoById,
} from "../Action/InformationAction";

const initialState = {
  info: [],
  isError: false,
  isLoading: false,
  message: "",
};

const informationSlice = createSlice({
  name: "information",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // * Get information builder
    builder.addCase(getInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.info = action.payload;
    });
    builder.addCase(getInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get information by id builder
    builder.addCase(getInfoById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getInfoById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.info = action.payload;
    });
    builder.addCase(getInfoById.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Add information builder
    builder.addCase(addInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.addInfo = action.payload;
    });
    builder.addCase(addInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Edit information builder
    builder.addCase(editInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.editInfo = action.payload;
    });
    builder.addCase(editInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Delete information builder
    builder.addCase(deleteInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.deleteInfo = action.payload;
    });
    builder.addCase(deleteInfo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export default informationSlice.reducer;
