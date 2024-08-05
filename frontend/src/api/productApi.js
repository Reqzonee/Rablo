// src/api/productApi.js

import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/products`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getFeaturedProducts = async (token) => {
    const response = await fetch(`${API_URL}/api/products/featured`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch featured products');
    }
    return response.json();
  };

  export const getProductsByPrice = async (token, maxPrice) => {
    console.log("IN side getproduct by price product api");
    const response = await fetch(`${API_URL}/api/products/price?max=${maxPrice}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products by price');
    }
    return response.json();
  };

  export const getProductsByRating = async (token, minRating) => {
    const response = await fetch(`${API_URL}/api/products/rating?min=${minRating}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch products by rating');
    }
    return response.json();
  };
  
  
  



export const addProduct = async (productData, token) => {
    try {
        console.log("I am inside addproduct");
      const response = await axios.post(`${API_URL}/api/products`, productData, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in headers
        }
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw new Error('Failed to add product');
    }
  };
  
  export const fetchUserProducts = async (token) => {
    console.log("Inside productapi to fetch user products");
    try {
      const response = await axios.get(`${API_URL}/api/products/user`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the header
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  };
  
// src/api/productApi.js

export const updateProduct = async (token, productId, updatedData) => {
    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  };
  
  export const deleteProduct = async (token, productId) => {
    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  };
  