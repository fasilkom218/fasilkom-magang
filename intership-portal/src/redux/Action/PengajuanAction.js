import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL_MHS;

export const getRegulerMhs = createAsyncThunk(
  "mhs/getRegulerMhs",
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

export const getRegulerMhsID = createAsyncThunk(
  "mhs/regulerID",
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

export const createRegulerMhs = createAsyncThunk(
  "mhs/createRegulerMhs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/magang-reguler`, data, {
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

export const updateRegulerMhs = createAsyncThunk(
  "mhs/updateRegulerMhs",
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
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const deleteRegulerMhs = createAsyncThunk(
  "mhs/deleteRegulerMhs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`${url}/magang-reguler/${data.id}`, {
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

// ===================== MAGANG KOMPETENSI ===================== //
export const getKompetensiMhs = createAsyncThunk(
  "mhs/getKompetensiMhs",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/magang-kompetensi`, {
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

export const getKompetensiMhsID = createAsyncThunk(
  "mhs/kompetensiID",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/magang-kompetensi/${data.id}`, {
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

export const createKompetensiMhs = createAsyncThunk(
  "mhs/createKompetensiMhs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/magang-kompetensi`, data, {
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

export const updateKompetensiMhs = createAsyncThunk(
  "mhs/updateKompetensiMhs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${url}/magang-kompetensi/${data.id}`,
        data,
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

export const deleteKompetensiMhs = createAsyncThunk(
  "mhs/deleteKompetensiMhs",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${url}/magang-kompetensi/${data.id}`,
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
