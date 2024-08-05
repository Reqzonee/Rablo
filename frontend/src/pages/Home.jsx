// src/pages/Home.jsx

import React from 'react';
import ProductList from '../components/ProductList';

const Home = ({ token }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Product Management</h1>
      {token ? (
        <ProductList token={token} />
      ) : (
        <p style={styles.message}>Please log in to manage products.</p>
      )}
    </div>
  );
};

// Inline styles for the page
const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  message: {
    textAlign: 'center',
    color: '#666',
  },
};

export default Home;
