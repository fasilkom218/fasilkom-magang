import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL_DOSPEM;
const url2 = import.meta.env.VITE_API_URL_MITRA;

export const getBimbingan = createAsyncThunk(
  "dospem/getBimbingan",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/bimbingan`, {
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

export const getBimbinganId = createAsyncThunk(
  "dospem/getBimbinganId",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/bimbingan/${data.id}`, {
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

export const getLaporanDospem = createAsyncThunk(
  "dospem/getLaporan",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/laporan`, {
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

export const getLaporanDospemId = createAsyncThunk(
  "dospem/getLaporanId",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/laporan/${data.id}`, {
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

export const revisionLaporan = createAsyncThunk(
  "dospem/updateLaporan",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${url}/laporan/${data.id}`,
        {
          comment: data.comment,
          status: "revision",
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const acceptLaporan = createAsyncThunk(
  "dospem/acceptLaporan",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${url}/laporan/${data.id}`,
        {
          comment: null,
          status: "accepted",
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data.message;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getBimbinganMitra = createAsyncThunk(
  "dospem/getBimbinganMitra",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url2}/mahasiswa`, {
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
