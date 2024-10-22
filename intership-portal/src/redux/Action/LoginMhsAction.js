import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import persistStore from "redux-persist/es/persistStore";
// import store from "../store";

const url = import.meta.env.VITE_API_URL_MHS;

export const registerMhs = createAsyncThunk(
  "mhs/registerMhs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/register`, data);
      return response.data.message;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const logoutMhs = createAsyncThunk("mhs/logoutMhs", async () => {
  await axios.delete(`${url}/logout`);
  // persistStore(store).purge();
});

export const loginMhs = createAsyncThunk(
  "mhs/loginMhs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/login`, data);
      const decoded = jwtDecode(response.data.accessToken);
      return {
        id: decoded.mhsId,
        name: decoded.name,
        token: response.data.accessToken,
        exp: decoded.exp,
        profile_pict: decoded.profile_pict,
        linkCV: decoded.linkCV,
        msg: response.data.message,
      };
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getMhs = createAsyncThunk(
  "mhs/getMhs",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/me`, {
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

export const refreshToken = createAsyncThunk(
  "mhs/refreshToken",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/token`);
      const decoded = jwtDecode(response.data.accessToken);
      return {
        id: decoded.mhsId,
        name: decoded.name,
        token: response.data.accessToken,
        profile_pict: decoded.profile_pict,
        linkCV: decoded.linkCV,
        exp: decoded.exp,
      };
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
