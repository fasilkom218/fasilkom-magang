import { createSlice } from "@reduxjs/toolkit";
import {
  acceptLaporan,
  getBimbingan,
  getBimbinganId,
  getBimbinganMitra,
  getLaporanDospem,
  getLaporanDospemId,
  revisionLaporan,
} from "../Action/BimbinganAction";

const initialState = {
  bimbingan: [],
  bimbinganMitra: [],
  laporan: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const bimbinganSlice = createSlice({
  name: "bimbingan",
  initialState,
  reducers: {
    resetBimbingan: (state) => initialState,
  },
  extraReducers: (builder) => {
    // * Get Bimbingan Builder
    builder.addCase(getBimbingan.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBimbingan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.bimbingan = action.payload;
    });
    builder.addCase(getBimbingan.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get Bimbingan BY ID Builder
    builder.addCase(getBimbinganId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBimbinganId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.bimbingan = action.payload;
    });
    builder.addCase(getBimbinganId.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get Laporan Builder
    builder.addCase(getLaporanDospem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLaporanDospem.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.laporan = action.payload;
    });
    builder.addCase(getLaporanDospem.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get Laporan BY ID Builder
    builder.addCase(getLaporanDospemId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLaporanDospemId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.laporan = action.payload;
    });
    builder.addCase(getLaporanDospemId.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Revision Laporan Builder
    builder.addCase(revisionLaporan.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(revisionLaporan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(revisionLaporan.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Accepted Laporan Builder
    builder.addCase(acceptLaporan.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(acceptLaporan.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(acceptLaporan.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get Bimbingan Mitra Builder
    builder.addCase(getBimbinganMitra.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBimbinganMitra.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.bimbinganMitra = action.payload;
    });
    builder.addCase(getBimbinganMitra.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetBimbingan } = bimbinganSlice.actions;
export default bimbinganSlice.reducer;
