// src/api/productApi.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const addProduct = async (productData, token) => {
    try {
      const response = await axios.post(API_URL, productData, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in headers
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw new Error('Failed to add product');
    }
  };
  
export const fetchUserProducts = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch products');
    }
  };
  