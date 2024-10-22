import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL_MHS;

export const getInfoMhs = createAsyncThunk(
  "mhs/getInfoMhs",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/information`, {
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
