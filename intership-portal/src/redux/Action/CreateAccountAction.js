import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL_ADMIN;

export const getAccount = createAsyncThunk(
  "admin/getAccount",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getAccountById = createAsyncThunk(
  "admin/getAccountById",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/account/${data.id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const addAccount = createAsyncThunk(
  "admin/addAccount",
  async (newAccount, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/account`, newAccount, {
        headers: {
          Authorization: `Bearer ${newAccount.token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const editAccount = createAsyncThunk(
  "admin/editAccount",
  async (editAccount, thunkAPI) => {
    try {
      await axios.put(`${url}/account/${editAccount.id}`, editAccount, {
        headers: {
          Authorization: `Bearer ${editAccount.token}`,
        },
      });
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "admin/deleteAccount",
  async (data, thunkAPI) => {
    try {
      await axios.delete(`${url}/account/${data.id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
