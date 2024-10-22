import { createSlice } from "@reduxjs/toolkit";
import {
  createKompetensiMhs,
  createRegulerMhs,
  deleteKompetensiMhs,
  deleteRegulerMhs,
  getKompetensiMhs,
  getKompetensiMhsID,
  getRegulerMhs,
  getRegulerMhsID,
  updateKompetensiMhs,
} from "../Action/PengajuanAction";
import { updateMagangReguler } from "../Action/MagangRegulerAction";

const initialState = {
  pengajuan: [],
  kompetensi: [],
  Loading: false,
  Error: false,
  Success: false,
  Sukses: false,
  Eror: false,
  message: "",
};

const pengajuanSlice = createSlice({
  name: "pengajuan",
  initialState,
  reducers: {
    resetPengajuan: (state) => initialState,
  },
  extraReducers: (builder) => {
    // * Get Magang Reguler
    builder.addCase(getRegulerMhs.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(getRegulerMhs.fulfilled, (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.pengajuan = action.payload;
    });
    builder.addCase(getRegulerMhs.rejected, (state, action) => {
      state.Loading = false;
      state.Error = true;
      state.message = action.payload;
    });

    // * Get Magang Reguler BY ID
    builder.addCase(getRegulerMhsID.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(getRegulerMhsID.fulfilled, (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.pengajuan = action.payload;
    });
    builder.addCase(getRegulerMhsID.rejected, (state, action) => {
      state.Loading = false;
      state.Error = true;
      state.message = action.payload;
    });

    // * Create Magang Reguler
    builder.addCase(createRegulerMhs.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(createRegulerMhs.fulfilled, (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.pengajuan = action.payload;
    });
    builder.addCase(createRegulerMhs.rejected, (state, action) => {
      state.Loading = false;
      state.Error = true;
      state.message = action.payload;
    });

    // * Update Magang Reguler
    builder.addCase(updateMagangReguler.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(updateMagangReguler.fulfilled, (state, action) => {
      state.Loading = false;
      state.Sukses = true;
      state.message = action.payload;
    });
    builder.addCase(updateMagangReguler.rejected, (state, action) => {
      state.Loading = false;
      state.Eror = true;
      state.message = action.payload;
    });

    // * Delete Magang Reguler
    builder.addCase(deleteRegulerMhs.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(deleteRegulerMhs.fulfilled, (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.message = action.payload;
    });
    builder.addCase(deleteRegulerMhs.rejected, (state, action) => {
      state.Loading = false;
      state.Error = true;
      state.message = action.payload;
    });

    // TODO: MAGANG KOMPETENSI

    // * Get Magang Kompetensi
    builder.addCase(getKompetensiMhs.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(getKompetensiMhs.fulfilled, (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.kompetensi = action.payload;
    });
    builder.addCase(getKompetensiMhs.rejected, (state, action) => {
      state.Loading = false;
      state.Error = true;
      state.message = action.payload;
    });

    // * Get Kompetensi BY ID
    builder.addCase(getKompetensiMhsID.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(getKompetensiMhsID.fulfilled, (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.kompetensi = action.payload;
    });
    builder.addCase(getKompetensiMhsID.rejected, (state, action) => {
      state.Loading = false;
      state.Error = true;
      state.message = action.payload;
    });

    // * Create Magang Kompetensi
    builder.addCase(createKompetensiMhs.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(createKompetensiMhs.fulfilled, (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.kompetensi = action.payload;
    });
    builder.addCase(createKompetensiMhs.rejected, (state, action) => {
      state.Loading = false;
      state.Error = true;
      state.message = action.payload;
    });

    // * Update Magang Kompetensi
    builder.addCase(updateKompetensiMhs.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(updateKompetensiMhs.fulfilled, (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.message = action.payload;
    });
    builder.addCase(updateKompetensiMhs.rejected, (state, action) => {
      state.Loading = false;
      state.Error = true;
      state.message = action.payload;
    });

    // * Delete Kompetensi
    builder.addCase(deleteKompetensiMhs.pending, (state) => {
      state.Loading = true;
    });
    builder.addCase(deleteKompetensiMhs.fulfilled, (state, action) => {
      state.Loading = false;
      state.Success = true;
      state.message = action.payload;
    });
    builder.addCase(deleteKompetensiMhs.rejected, (state, action) => {
      state.Loading = false;
      state.Error = true;
      state.message = action.payload;
    });
  },
});

export const { resetPengajuan } = pengajuanSlice.actions;
export default pengajuanSlice.reducer;
