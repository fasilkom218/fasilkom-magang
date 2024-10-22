import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const url = import.meta.env.VITE_API_URL_AUTH;
const url_admin = import.meta.env.VITE_API_URL_ADMIN;

export const Login = createAsyncThunk(
  "users/Login",
  async (users, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/login`, users);
      const decoded = jwtDecode(response.data.accessToken);
      return {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        profile: decoded.profile,
        token: response.data.accessToken,
      };
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getUser = createAsyncThunk(
  "users/getUser",
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

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${url_admin}/account`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
  }
);

export const Logout = createAsyncThunk("users/Logout", async () => {
  await axios.delete(`${url}/logout`);
});

export const refreshTokenUser = createAsyncThunk(
  "users/refreshTokenUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/token-admin`);
      const decoded = jwtDecode(response.data.accessToken);
      return {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        profile: decoded.profile,
        token: response.data.accessToken,
      };
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
