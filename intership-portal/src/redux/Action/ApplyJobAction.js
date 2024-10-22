import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = import.meta.env.VITE_API_URL_MHS;
// const token = localStorage.getItem("token");

export const getJob = createAsyncThunk(
  "mhs/getJob",
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

export const getJobById = createAsyncThunk(
  "mhs/getJobId",
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

export const getApply = createAsyncThunk(
  "mhs/getApply",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(`${url}/job/applications`, {
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

export const applyJob = createAsyncThunk(
  "mhs/applyJob",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${url}/job/${data.id}/apply`,
        {
          sop: data.sop,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
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
