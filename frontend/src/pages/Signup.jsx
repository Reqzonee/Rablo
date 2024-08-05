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
    <div>
      <h1>Signup</h1>
      <SignupForm onSuccess={handleSignupSuccess} onFailure={handleSignupFailure} />
      {signupStatus && <p>{signupStatus}</p>}
    </div>
  );
};

export default Signup;
