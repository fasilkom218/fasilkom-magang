import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL_KAPRODI;

export const getMagangReguler = createAsyncThunk(
  "kaprodi/magangReguler",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/magang-reguler`, {
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

export const getMagangRegulerById = createAsyncThunk(
  "kaprodi/magangRegulerId",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/magang-reguler/${data.id}`, {
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

export const updateMagangReguler = createAsyncThunk(
  "kaprodi/udpateMagangReguler",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${url}/magang-reguler/${data.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      if (error.message) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
