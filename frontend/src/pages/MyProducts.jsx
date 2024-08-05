// src/pages/MyProducts.jsx

import React, { useState, useEffect } from 'react';
import { fetchUserProducts } from '../api/productApi';

const MyProducts = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>My Products</h1>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product._id}>
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>Featured: {product.featured ? 'Yes' : 'No'}</p>
              <p>Rating: {product.rating}</p>
              <p>Created At: {new Date(product.createdAt).toLocaleDateString()}</p>
              <p>Company: {product.company}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyProducts;
