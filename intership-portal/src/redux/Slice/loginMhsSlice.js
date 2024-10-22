import { createSlice } from "@reduxjs/toolkit";
import {
  getMhs,
  loginMhs,
  refreshToken,
  registerMhs,
} from "../Action/LoginMhsAction";

const initialState = {
  user: {
    id: "",
    name: "",
    token: "",
    profile_pict: null,
    linkCV: null,
    exp: 0,
    isAuth: false,
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const loginMhsSlice = createSlice({
  name: "loginMhs",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // * Login Builder
    builder.addCase(loginMhs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginMhs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(loginMhs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Register Builder
    builder.addCase(registerMhs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerMhs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload;
    });
    builder.addCase(registerMhs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Get User Builder
    builder.addCase(getMhs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMhs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMhs.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // * Refresh Token Builder
    builder.addCase(refreshToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = loginMhsSlice.actions;
export default loginMhsSlice.reducer;
