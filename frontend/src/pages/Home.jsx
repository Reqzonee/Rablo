// src/pages/Home.jsx

import React, { useState } from 'react';
import ProductList from '../components/ProductList';

const Home = ({ token }) => {
  const [filter, setFilter] = useState('all');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Product Management</h1>
      {token ? (
        <>
          <div style={styles.filterContainer}>
            <button onClick={() => setFilter('all')} style={styles.button}>All Products</button>
            <button onClick={() => setFilter('featured')} style={styles.button}>Featured Products</button>
            <button onClick={() => setFilter('price')} style={styles.button}>Filter by Price</button>
            <button onClick={() => setFilter('rating')} style={styles.button}>Filter by Rating</button>
          </div>
          {filter === 'price' && (
            <div style={styles.inputContainer}>
              <label style={styles.label}>Max Price:</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                style={styles.input} 
              />
            </div>
          )}
          {filter === 'rating' && (
            <div style={styles.inputContainer}>
              <label style={styles.label}>Min Rating:</label>
              <input 
                type="number" 
                step="0.1"
                value={rating} 
                onChange={(e) => setRating(e.target.value)} 
                style={styles.input} 
              />
            </div>
          )}
          <ProductList token={token} filter={filter} price={price} rating={rating} />
        </>
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
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  button: {
    margin: '0 10px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  label: {
    marginBottom: '5px',
    fontSize: '16px',
    color: '#333',
  },
  input: {
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
};

export default Home;
