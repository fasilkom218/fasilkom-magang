import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL_TIM;

export const getJob = createAsyncThunk(
  "mitra/getJob",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/job`, {
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

export const getJobId = createAsyncThunk(
  "mitra/getJobId",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/job/${data.id}`, {
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

export const addJob = createAsyncThunk(
  "mitra/addJob",
  async (newJob, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/job`, newJob, {
        headers: {
          Authorization: `Bearer ${newJob.token}`,
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

export const editJob = createAsyncThunk(
  "mitra/editJob",
  async (updateJob, thunkAPI) => {
    try {
      await axios.put(`${url}/job/${updateJob.id}`, updateJob, {
        headers: {
          Authorization: `Bearer ${updateJob.token}`,
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

export const deleteJob = createAsyncThunk(
  "mitra/deleteJob",
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`${url}/job/${data.id}`, {
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
