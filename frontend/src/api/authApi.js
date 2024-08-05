// src/api/authApi.js

import axios from 'axios';

const AUTH_URL = 'http://localhost:3000/api/auth';

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const signup = async (userData) => {
  try {
    console.log("I am inside api calling");
    const response = await axios.post(`${AUTH_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error.response ? error.response.data : error.message);
    throw error; // Re-throw the error to be handled by the caller
  }
};