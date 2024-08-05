// src/components/ProductList.jsx

import React, { useEffect, useState } from 'react';
import { getAllProducts, getFeaturedProducts, getProductsByPrice, getProductsByRating } from '../api/productApi';

const ProductList = ({ token, filter, price, rating }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      let data;
      if (filter === 'featured') {
        data = await getFeaturedProducts(token);
      } else if (filter === 'price') {
        console.log("price is ", price);
        data = await getProductsByPrice(token, price);
      } else if (filter === 'rating') {
        data = await getProductsByRating(token, rating);
      } else {
        data = await getAllProducts(token);
      }

      const formattedData = data.map(product => ({
        ...product,
        price: typeof product.price === 'object' ? product.price.$numberDecimal : product.price,
        rating: typeof product.rating === 'object' ? product.rating.$numberDecimal : product.rating,
      }));

      setProducts(formattedData);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token, filter, price, rating]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Products</h2>
      <div style={styles.grid}>
        {products.map(product => (
          <div key={product._id} style={styles.card}>
            <div style={styles.cardContent}>
              <div style={styles.field}><strong>Name:</strong> {product.name}</div>
              <div style={styles.field}><strong>Price:</strong> ${product.price}</div>
              <div style={styles.field}><strong>Rating:</strong> {product.rating}</div>
              <div style={styles.field}><strong>Company:</strong> {product.company}</div>
              <div style={styles.field}><strong>Featured:</strong> {product.featured ? 'Yes' : 'No'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    marginBottom: '10px',
    fontSize: '16px',
    color: '#333',
  },
};

export default ProductList;
