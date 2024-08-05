// src/components/LoginForm.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = ({ setToken }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { token } = await login(data);
      setToken(token);
      toast.success('Login successful');
      navigate('/');
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            style={styles.input}
            {...register('email', { required: 'Email is required' })}
          />
          <p style={styles.error}>{errors.email?.message}</p>
        </div>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            {...register('password', { required: 'Password is required' })}
          />
          <p style={styles.error}>{errors.password?.message}</p>
        </div>
        <button type="submit" style={styles.button}>Log In</button>
      </form>
    </>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fieldContainer: {
    marginBottom: '20px',
    width: '100%',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '16px',
    transition: 'border-color 0.3s',
  },
  inputFocus: {
    borderColor: '#007bff',
  },
  error: {
    color: '#ff4d4f',
    fontSize: '14px',
    marginTop: '5px',
  },
  button: {
    width: '100%',
    padding: '12px 20px',
    borderRadius: '6px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default LoginForm;
