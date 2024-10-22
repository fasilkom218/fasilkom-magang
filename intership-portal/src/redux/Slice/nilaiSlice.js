import { createSlice } from "@reduxjs/toolkit";
import {
  createNilai,
  createNilaiMitra,
  deleteNilai,
  deleteNilaiMitra,
  getBobot,
  getBobotId,
  getBobotIdMitra,
  getBobotMitra,
  getNilai,
  getNilaiId,
  getNilaiIdMitra,
  getNilaiMitra,
  updateNilai,
  updateNilaiMitra,
} from "../Action/NilaiAction";

const initialState = {
  nilai: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const nilaiSlice = createSlice({
  name: "nilai",
  initialState,
  reducers: {
    resetNilai: (state) => initialState,
  },
  extraReducers: (builder) => {
    // * Get Nilai Builder
    builder.addCase(getNilai.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNilai.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.nilai = action.payload;
    });
    builder.addCase(getNilai.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get Nilai BY ID Builder
    builder.addCase(getNilaiId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNilaiId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.nilai = action.payload;
    });
    builder.addCase(getNilaiId.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Create Nilai Builder
    builder.addCase(createNilai.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createNilai.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.nilai = action.payload;
    });
    builder.addCase(createNilai.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Update Nilai Builder
    builder.addCase(updateNilai.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateNilai.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(updateNilai.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Delete Nilai Builder
    builder.addCase(deleteNilai.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteNilai.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(deleteNilai.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get Bobot Builder
    builder.addCase(getBobot.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBobot.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.nilai = action.payload;
    });
    builder.addCase(getBobot.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get Bobot By Id Builder
    builder.addCase(getBobotId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBobotId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.nilai = action.payload;
    });
    builder.addCase(getBobotId.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get Nilai Builder
    builder.addCase(getNilaiMitra.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNilaiMitra.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.nilai = action.payload;
    });
    builder.addCase(getNilaiMitra.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get Nilai BY ID Builder
    builder.addCase(getNilaiIdMitra.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNilaiIdMitra.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.nilai = action.payload;
    });
    builder.addCase(getNilaiIdMitra.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Create Nilai Builder
    builder.addCase(createNilaiMitra.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createNilaiMitra.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.nilai = action.payload;
    });
    builder.addCase(createNilaiMitra.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Update Nilai Builder
    builder.addCase(updateNilaiMitra.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateNilaiMitra.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(updateNilaiMitra.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Delete Nilai Builder
    builder.addCase(deleteNilaiMitra.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteNilaiMitra.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(deleteNilaiMitra.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get Bobot Builder
    builder.addCase(getBobotMitra.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBobotMitra.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.nilai = action.payload;
    });
    builder.addCase(getBobotMitra.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get Bobot By Id Builder
    builder.addCase(getBobotIdMitra.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBobotIdMitra.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.nilai = action.payload;
    });
    builder.addCase(getBobotIdMitra.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetNilai } = nilaiSlice.actions;
export default nilaiSlice.reducer;
