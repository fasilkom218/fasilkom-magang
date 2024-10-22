import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL_ADMIN;

export const getInfo = createAsyncThunk(
  "users/getInfo",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/articles`, {
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

export const getInfoById = createAsyncThunk(
  "users/getInfoById",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/articles/${data.id}`, {
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

export const addInfo = createAsyncThunk(
  "users/addInfo",
  async (newInfo, thunkAPI) => {
    try {
      const response = await axios.post(
        `${url}/articles`,
        {
          title: newInfo.title,
          author: newInfo.author,
          desc: newInfo.desc,
        },
        {
          headers: {
            Authorization: `Bearer ${newInfo.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const editInfo = createAsyncThunk(
  "users/editInfo",
  async (newInfo, thunkAPI) => {
    try {
      await axios.put(
        `${url}/articles/${newInfo.id}`,
        {
          title: newInfo.title,
          author: newInfo.author,
          desc: newInfo.desc,
        },
        {
          headers: {
            Authorization: `Bearer ${newInfo.token}`,
          },
        }
      );
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const deleteInfo = createAsyncThunk(
  "users/deleteInfo",
  async (data, thunkAPI) => {
    try {
      await axios.delete(`${url}/articles/${data.id}`, {
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
