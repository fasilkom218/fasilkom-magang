import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL_TIM;

export const getApplicant = createAsyncThunk(
  "mitra/getApplicant",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/applications`, {
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

export const getApplicantId = createAsyncThunk(
  "mitra/getApplicantId",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/applications/${data.id}`, {
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
