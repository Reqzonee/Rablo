import React, { useState, useEffect } from 'react';
import { fetchUserProducts, updateProduct, deleteProduct } from '../api/productApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Inline styles for the component
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  productList: {
    listStyle: 'none',
    padding: '0',
  },
  productItem: {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  productTitle: {
    fontSize: '1.2em',
    color: '#333',
    marginBottom: '10px',
  },
  productDetails: {
    fontSize: '0.9em',
    color: '#555',
    marginBottom: '5px',
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
  },
  button: {
    padding: '8px 12px',
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
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    marginBottom: '5px',
  },
  buttonGroup: {
    marginTop: '10px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1em',
    color: '#555',
  },
  error: {
    textAlign: 'center',
    fontSize: '1em',
    color: '#DC3545',
  },
};

const MyProducts = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

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

  const handleUpdate = async (productId, updatedData) => {
    try {
      await updateProduct(token, productId, updatedData);
      toast.success('Product updated successfully!');
      const userProducts = await fetchUserProducts(token);
      setProducts(userProducts);
      setEditingProductId(null);
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(token, productId);
      toast.success('Product deleted successfully!');
      const userProducts = await fetchUserProducts(token);
      setProducts(userProducts);
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleEditClick = (product) => {
    setEditingProductId(product._id);
    setEditFormData({
      name: product.name,
      price: product.price,
      featured: product.featured,
      rating: product.rating.$numberDecimal,
      company: product.company,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async (productId) => {
    const updatedData = { ...editFormData };
    await handleUpdate(productId, updatedData);
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <ToastContainer />
      <h1 style={styles.title}>My Products</h1>
      {products.length === 0 ? (
        <p style={styles.error}>No products found</p>
      ) : (
        <ul style={styles.productList}>
          {products.map(product => (
            <li
              key={product._id}
              style={styles.productItem}
              className="product-item"
            >
              {editingProductId === product._id ? (
                <div>
                  <div style={styles.formGroup}>
                    <label>Name</label>
                    <input
                      name="name"
                      value={editFormData.name}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Price</label>
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Featured</label>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={editFormData.featured}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      name="rating"
                      value={editFormData.rating}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label>Company</label>
                    <input
                      name="company"
                      value={editFormData.company}
                      onChange={handleChange}
                      style={styles.input}
                    />
                  </div>
                  <div style={styles.buttonGroup}>
                    <button
                      style={{ ...styles.button, ...styles.updateButton }}
                      onClick={() => handleSave(product._id)}
                    >
                      Save
                    </button>
                    <button
                      style={{ ...styles.button, ...styles.deleteButton }}
                      onClick={() => setEditingProductId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 style={styles.productTitle}>{product.name}</h2>
                  <p style={styles.productDetails}>
                    <span style={styles.label}>Price:</span> <span style={styles.productPrice}>${product.price}</span>
                  </p>
                  <p style={styles.productDetails}>
                    <span style={styles.label}>Featured:</span> {product.featured ? 'Yes' : 'No'}
                  </p>
                  <p style={styles.productDetails}>
                    <span style={styles.label}>Rating:</span> {product.rating.$numberDecimal}
                  </p>
                  <p style={styles.productDetails}>
                    <span style={styles.label}>Created At:</span> {new Date(product.createdAt).toLocaleDateString()}
                  </p>
                  <p style={styles.productDetails}>
                    <span style={styles.label}>Company:</span> {product.company}
                  </p>
                  <button
                    style={{ ...styles.button, ...styles.updateButton }}
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...styles.button, ...styles.deleteButton }}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyProducts;
