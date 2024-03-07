import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'

const apiURL = process.env.API_URL ? process.env.API_URL : "https://pklaos88.online";

axios.defaults.baseURL = apiURL;

const userLogin = createAsyncThunk(
  'auth/login',
  async ({username, password}) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await axios.post(apiURL + "/api/auth/user/signin", {
        username,
        password,
      }, config);

      const infoResponse = await axios.get(apiURL+ '/api/user/me',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${response.data.accessToken}`,
          },
        }
      )
      
      return { auth: response.data, user: infoResponse.data};
    } catch (error) {
      console.error(error);
    }
  }
);

userLogin.fulfilled = 'auth/login/fulfilled';
userLogin.pending = 'auth/login/pending';
userLogin.rejected = 'auth/login/rejected';

const userRefreshToken = createAsyncThunk(
  'auth/refresh',
  async ({accessToken, refreshToken}, {rejectWithValue}) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const response = await axios.post(apiURL + "/api/auth/user/refresh", {
        accessToken,
        refreshToken,
      }, config);

      console.log("refresh:",response)
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
);

userRefreshToken.fulfilled = 'auth/refresh/fulfilled';
userRefreshToken.pending = 'auth/refresh/pending';
userRefreshToken.rejected = 'auth/refresh/rejected';

export {userLogin, userRefreshToken};