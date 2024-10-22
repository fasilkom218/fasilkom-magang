import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL_DOSPEM;

export const getLogbook = createAsyncThunk(
  "dospem/getLogbook",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/logbook`, {
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

export const getLogbookId = createAsyncThunk(
  "dospem/getLogbookId",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/logbook/${data.id}`, {
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
