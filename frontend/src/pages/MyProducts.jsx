// src/pages/MyProducts.jsx

import React, { useState, useEffect } from 'react';
import { fetchUserProducts, updateProduct, deleteProduct } from '../api/productApi';

// Inline styles for the component
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
    color: '#333',
  },
  productList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  productItem: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease-in-out',
  },
  productItemHover: {
    transform: 'scale(1.02)',
  },
  productTitle: {
    fontSize: '1.5rem',
    margin: '0 0 10px 0',
    color: '#333',
  },
  productDetails: {
    marginBottom: '10px',
  },
  label: {
    fontWeight: 'bold',
  },
  productPrice: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: '1.2rem',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#007BFF',
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    cursor: 'pointer',
    marginRight: '10px',
  },
  updateButton: {
    backgroundColor: '#007BFF',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
  },
  input: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '8px',
    width: '100%',
  },
  editableField: {
    marginBottom: '10px',
  },
};

const MyProducts = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      try {
        const userProducts = await fetchUserProducts(token);
        setProducts(userProducts);
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [token]);

  const handleUpdate = async (productId) => {
    try {
      await updateProduct(token, productId, updatedProduct);
      const userProducts = await fetchUserProducts(token);
      setProducts(userProducts);
      setEditingProduct(null);
      setUpdatedProduct({});
    } catch (error) {
      setError('Failed to update product');
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(token, productId);
      const userProducts = await fetchUserProducts(token);
      setProducts(userProducts);
    } catch (error) {
      setError('Failed to delete product');
    }
  };

  const handleInputChange = (e, field, productId) => {
    const value = e.target.value;
    setUpdatedProduct(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Products</h1>
      {products.length === 0 ? (
        <p style={styles.error}>No products found</p>
      ) : (
        <ul style={styles.productList}>
          {products.map(product => (
            <li
              key={product?._id}
              style={styles.productItem}
              className="product-item"
            >
              {editingProduct === product._id ? (
                <>
                  <div style={styles.editableField}>
                    <label style={styles.label}>Name:</label>
                    <input
                      type="text"
                      value={updatedProduct.name || product.name}
                      onChange={(e) => handleInputChange(e, 'name', product._id)}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.editableField}>
                    <label style={styles.label}>Price:</label>
                    <input
                      type="text"
                      value={updatedProduct.price || product.price}
                      onChange={(e) => handleInputChange(e, 'price', product._id)}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.editableField}>
                    <label style={styles.label}>Rating:</label>
                    <input
                      type="text"
                      value={updatedProduct.rating || product.rating?.$numberDecimal}
                      onChange={(e) => handleInputChange(e, 'rating', product._id)}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.editableField}>
                    <label style={styles.label}>Featured:</label>
                    <select
                      value={updatedProduct.featured || product.featured}
                      onChange={(e) => handleInputChange(e, 'featured', product._id)}
                      style={styles.input}
                    >
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                  <button
                    style={{ ...styles.button, ...styles.updateButton }}
                    onClick={() => handleUpdate(product._id)}
                  >
                    Save
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.deleteButton }}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                  <button
                    style={styles.button}
                    onClick={() => setEditingProduct(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h2 style={styles.productTitle}>{product?.name}</h2>
                  <p style={styles.productDetails}>
                    <span style={styles.label}>Price:</span> <span style={styles.productPrice}>${product?.price}</span>
                  </p>
                  <p style={styles.productDetails}>
                    <span style={styles.label}>Featured:</span> {product?.featured ? 'Yes' : 'No'}
                  </p>
                  <p style={styles.productDetails}>
                    <span style={styles.label}>Rating:</span> {product?.rating?.$numberDecimal}
                  </p>
                  <p style={styles.productDetails}>
                    <span style={styles.label}>Created At:</span> {new Date(product?.createdAt).toLocaleDateString()}
                  </p>
                  <p style={styles.productDetails}>
                    <span style={styles.label}>Company:</span> {product?.company}
                  </p>
                  <button
                    style={{ ...styles.button, ...styles.updateButton }}
                    onClick={() => {
                      setEditingProduct(product._id);
                      setUpdatedProduct({
                        name: product.name,
                        price: product.price,
                        rating: product.rating?.$numberDecimal,
                        featured: product.featured,
                      });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.deleteButton }}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyProducts;
