import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL_MHS;

export const getLogbookMhs = createAsyncThunk(
  "mhs/getLogbookMhs",
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

export const addLogbookMhs = createAsyncThunk(
  "mhs/addLogbookMhs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${url}/logbook`,
        {
          title: data.title,
          desc: data.desc,
          dateOfPosting: data.dateOfPosting,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const updateLogbookMhs = createAsyncThunk(
  "mhs/updateLogbookMhs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${url}/logbook/${data.id}`,
        {
          title: data.title,
          desc: data.desc,
          dateOfPosting: data.dateOfPosting,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const deleteLogbookMhs = createAsyncThunk(
  "mhs/deleteLogbookMhs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`${url}/logbook/${data.id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data.message;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);
