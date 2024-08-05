// src/pages/Login.jsx

import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';

const Login = ({ setToken }) => {
  const [loginStatus, setLoginStatus] = useState('');

  const handleLoginSuccess = () => {
    setLoginStatus('Login successful');
  };

  const handleLoginFailure = () => {
    setLoginStatus('Login failed. Please try again.');
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm setToken={setToken} onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />
      {loginStatus && <p>{loginStatus}</p>}
    </div>
  );
};

export default Login;
