// src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, userName, onLogout }) => {
  const navigate = useNavigate();
  const AUTH_URL = import.meta.env.VITE_API_URL;


  const handleLogout = async () => {
    try {
      await fetch(`${AUTH_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      localStorage.removeItem('token');
      onLogout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>Home</Link>
      </div>
      <div style={styles.links}>
        {token ? (
          <>
            <span style={styles.userName}>Hello, {userName}</span>
            <Link to="/add-product" style={styles.navLink}>Add Product</Link>
            <Link to="/my-products" style={styles.navLink}>My Products</Link>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.navLink}>Login</Link>
            <Link to="/signup" style={styles.navLink}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#282c34',
    color: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid #ccc',
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
  },
  logoLink: {
    textDecoration: 'none',
    color: '#61dafb',
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  navLink: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.3s',
  },
  userName: {
    fontSize: '1rem',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '1rem',
  }
};

export default Navbar;
