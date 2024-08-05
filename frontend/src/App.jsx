// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import AddProduct from './pages/AddProduct';
import MyProducts from './pages/MyProducts';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userName, setUserName] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
    // console.log("token is inside app.jsx", token);
    if (token) {
      // Fetch user data or decode token to get the user's name
      fetch(`${apiUrl}/api/auth/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.name) {
          setUserName(data.name);
        } else {
          console.error('No name returned in user data', data);
        }
      })
      .catch(error => console.error('Failed to fetch user data', error));
    }
  }, [token]);

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserName('');
  };

  return (
    <Router>
      <div>
        <Navbar token={token} userName={userName} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={token ? <Home token={token} onLogout={handleLogout} /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={<Login setToken={saveToken} />}
          />
          <Route
            path="/signup"
            element={<Signup />}
          />
          <Route
            path="/add-product"
            element={token ? <AddProduct token={token}/> : <Navigate to="/login" />}
          />
          <Route
            path="/my-products"
            element={token ? <MyProducts token={token}/> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
