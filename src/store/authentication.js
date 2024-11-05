// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getInitialToken = () => {
  return localStorage.getItem('authToken') || null; // Get token from local storage
};

const authSlice = createSlice({
  name: 'auth',
  initialState:{
    token: getInitialToken(),
    isAuthenticated: !!getInitialToken(),
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      localStorage.setItem('authToken', action.payload); // Save token to local storage
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken'); // Remove token from local storage
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
