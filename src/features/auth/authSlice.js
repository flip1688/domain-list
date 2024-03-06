import { createSlice } from '@reduxjs/toolkit'
import { userLogin, userRefreshToken } from './authActions';

const authFromLocalStorage = localStorage.getItem("auth");
const userAuth = authFromLocalStorage !== "undefined" ? JSON.parse(authFromLocalStorage) : null;

const initialState = {
  userInfo: null,
  userAuth,
  success: false,
  error: null,
  loading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear() // delete token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true
      state.error = null
    });

    builder.addCase(userLogin.fulfilled , (state, { payload }) => {
      state.loading = false
      // state.userInfo = payload
      state.userAuth = payload.auth
      state.userInfo = payload.user
      localStorage.setItem("auth", JSON.stringify(payload.auth))
    });

     builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false
      state.error = payload
    });

    builder.addCase(userRefreshToken.pending, (state) => {
      state.loading = true
      state.error = null
    });

     builder.addCase(userRefreshToken.fulfilled, (state, { payload }) => {
      state.loading = false
      // state.userInfo = payload.data
      state.userAuth = payload
      localStorage.setItem("auth", JSON.stringify(payload))
    });
    
    builder.addCase(userRefreshToken.rejected, (state, { payload }) => {
      localStorage.clear() // delete token from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = false;
    });
  },
})
export const { logout } = authSlice.actions

export default  authSlice.reducer