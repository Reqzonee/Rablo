// src/components/LoginForm.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setToken }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { token } = await login(data);
      setToken(token);
      alert('Login successful');
      navigate('/');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input type="email" {...register('email', { required: 'Email is required' })} />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password', { required: 'Password is required' })} />
        <p>{errors.password?.message}</p>
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
