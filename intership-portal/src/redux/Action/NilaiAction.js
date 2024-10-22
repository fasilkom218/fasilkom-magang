import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL_DOSPEM;

export const getNilai = createAsyncThunk(
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

export const getNilaiId = createAsyncThunk(
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

export const createNilai = createAsyncThunk(
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

export const updateNilai = createAsyncThunk(
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

export const deleteNilai = createAsyncThunk(
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

export const getBobot = createAsyncThunk(
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

export const getBobotId = createAsyncThunk(
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

const url2 = import.meta.env.VITE_API_URL_MITRA;

export const getNilaiMitra = createAsyncThunk(
  "mitra/nilai",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url2}/nilai`, {
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
  "mitra/nilaiId",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url2}/nilai/${data.id}`, {
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
  "mitra/createNilai",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${url2}/nilai`, data, {
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
  "mitra/updateNilai",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(`${url2}/nilai/${data.id}`, data, {
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
  "mitra/deleteNilai",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`${url2}/nilai/${data.id}`, {
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
  "mitra/bobot",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url2}/bobot`, {
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
  "mitra/bobotId",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url2}/bobot/${data.id}`, {
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
