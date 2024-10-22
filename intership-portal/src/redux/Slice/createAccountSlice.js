import { createSlice } from "@reduxjs/toolkit";
import {
  addAccount,
  deleteAccount,
  editAccount,
  getAccount,
  getAccountById,
} from "../Action/CreateAccountAction";

const initialState = {
  account: [],
  isLoading: false,
  Error: false,
  Success: false,
  message: "",
};

const createAccountSlice = createSlice({
  name: "createAccount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // * Get all account builder
    builder.addCase(getAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAccount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.account = action.payload;
    });
    builder.addCase(getAccount.rejected, (state, action) => {
      state.isLoading = false;
      state.Error = true;
      state.message = action.payload;
    });

    // * Get all account by id builder
    builder.addCase(getAccountById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAccountById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.account = action.payload;
    });
    builder.addCase(getAccountById.rejected, (state, action) => {
      state.isLoading = false;
      state.Error = true;
      state.message = action.payload;
    });

    // * Add account builder
    builder.addCase(addAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addAccount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Success = true;
      state.account = action.payload;
    });
    builder.addCase(addAccount.rejected, (state, action) => {
      state.isLoading = false;
      state.Error = true;
      state.message = action.payload;
    });

    // * Edit account builder
    builder.addCase(editAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editAccount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.Success = true;
      state.account = action.payload;
    });
    builder.addCase(editAccount.rejected, (state, action) => {
      state.isLoading = false;
      state.Error = true;
      state.message = action.payload;
    });

    // * Delete account builder
    builder.addCase(deleteAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.account = action.payload;
    });
    builder.addCase(deleteAccount.rejected, (state, action) => {
      state.isLoading = false;
      state.Error = true;
      state.message = action.payload;
    });
  },
});

export default createAccountSlice.reducer;
