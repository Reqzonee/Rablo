// src/pages/AddProduct.jsx

import React, { useState } from 'react';
import AddProductForm from '../components/AddProductForm';

const AddProduct = ({token}) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshProducts = () => {
      setRefreshKey(oldKey => oldKey + 1);
    };
  
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Add Product</h1>
      <AddProductForm token={token} refreshProducts={refreshProducts} />
    </div>
  );
};

// Inline styles for the page
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
};

export default AddProduct;
