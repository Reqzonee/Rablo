import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/productApi';

const ProductList = ({ token }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts(token);
      // Ensure all fields are in the correct format
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
  }, [token]);

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
