// src/components/SignupForm.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { signup } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    console.log("data is ", data);
    try {
      await signup(data);
      alert('Signup successful');
      navigate('/login'); 
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input {...register('name', { required: 'Name is required' })} />
        <p>{errors.name?.message}</p>
      </div>
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
      <button type="submit">Signup</button>
    </form>
  );
};

export default SignupForm;
