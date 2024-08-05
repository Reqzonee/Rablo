// src/components/AddProductForm.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addProduct } from '../api/productApi';

// Validation schema
const schema = yup.object().shape({
  productId: yup.string().required('Product ID is required'),
  name: yup.string().required('Name is required'),
  price: yup.number().required('Price is required').typeError('Price must be a number'),
  company: yup.string().required('Company is required'),
});

const AddProductForm = ({ token, refreshProducts }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await addProduct(data, token);
      alert('Product added successfully');
      refreshProducts();
      reset();
    } catch (error) {
      alert('Error adding product');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <h2 style={styles.title}>Add Product</h2>
      <div style={styles.formGroup}>
        <label style={styles.label}>Product ID</label>
        <input {...register('productId')} style={styles.input} />
        <p style={styles.error}>{errors.productId?.message}</p>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Name</label>
        <input {...register('name')} style={styles.input} />
        <p style={styles.error}>{errors.name?.message}</p>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Price</label>
        <input type="number" {...register('price')} style={styles.input} />
        <p style={styles.error}>{errors.price?.message}</p>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Featured</label>
        <input type="checkbox" {...register('featured')} style={styles.checkbox} />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Rating</label>
        <input type="number" step="0.1" {...register('rating')} style={styles.input} />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Created At</label>
        <input type="date" {...register('createdAt')} style={styles.input} />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Company</label>
        <input {...register('company')} style={styles.input} />
        <p style={styles.error}>{errors.company?.message}</p>
      </div>
      <button type="submit" style={styles.button}>Add Product</button>
    </form>
  );
};

// Inline styles for the form
const styles = {
  form: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  checkbox: {
    marginTop: '5px',
  },
  error: {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '5px',
  },
  button: {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default AddProductForm;
