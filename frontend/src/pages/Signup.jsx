// src/pages/Signup.jsx

import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';

const Signup = () => {
  const [signupStatus, setSignupStatus] = useState('');

  const handleSignupSuccess = () => {
    setSignupStatus('Signup successful. Please log in.');
  };

  const handleSignupFailure = () => {
    setSignupStatus('Signup failed. Please try again.');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Your Account</h1>
      <SignupForm onSuccess={handleSignupSuccess} onFailure={handleSignupFailure} />
      {signupStatus && <p style={styles.status}>{signupStatus}</p>}
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

export default Signup;
