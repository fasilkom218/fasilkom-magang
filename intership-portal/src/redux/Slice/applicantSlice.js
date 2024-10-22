import { createSlice } from "@reduxjs/toolkit";
import { getApplicant, getApplicantId } from "../Action/ApplicantAction";

const initialState = {
  applicant: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const applicantSlice = createSlice({
  name: "applicant",
  initialState,
  reducers: {
    resetApp: (state) => initialState,
  },
  extraReducers: (builder) => {
    // Get Applicant
    builder.addCase(getApplicant.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getApplicant.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.applicant = action.payload;
    });
    builder.addCase(getApplicant.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Get Applicant By Id
    builder.addCase(getApplicantId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getApplicantId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.applicant = action.payload;
    });
    builder.addCase(getApplicantId.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { resetApp } = applicantSlice.actions;
export default applicantSlice.reducer;
