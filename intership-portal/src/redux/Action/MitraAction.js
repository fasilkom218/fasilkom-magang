import { createAction } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL_MITRA;

export const getNilaiMitra = createAsyncThunk(
  "dospem/nilai",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/nilai`, {
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

export const getNilaiIdMitra = createAsyncThunk(
  "dospem/nilaiId",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/nilai/${data.id}`, {
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

export const createNilaiMitra = createAsyncThunk(
  "dospem/createNilai",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/nilai`, data, {
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

export const updateNilaiMitra = createAsyncThunk(
  "dospem/updateNilai",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(`${url}/nilai/${data.id}`, data, {
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

export const deleteNilaiMitra = createAsyncThunk(
  "dospem/deleteNilai",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`${url}/nilai/${data.id}`, {
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

export const getBobotMitra = createAsyncThunk(
  "dospem/bobot",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/bobot`, {
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

export const getBobotIdMitra = createAsyncThunk(
  "dospem/bobotId",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/bobot/${data.id}`, {
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
