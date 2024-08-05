// src/pages/Login.jsx

import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';

const Login = ({ setToken }) => {
  const [loginStatus, setLoginStatus] = useState('');

  const handleLoginSuccess = () => {
    setLoginStatus('Login successful.');
  };

  const handleLoginFailure = () => {
    setLoginStatus('Login failed. Please try again.');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome Back</h1>
      <LoginForm setToken={setToken} onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />
      {loginStatus && <p style={styles.status}>{loginStatus}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    color: '#333',
    marginBottom: '30px',
    fontWeight: 'bold',
  },
  status: {
    color: '#ff4d4f',
    marginTop: '20px',
    fontSize: '16px',
    fontWeight: '500',
  },
};

export default Login;
