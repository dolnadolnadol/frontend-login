'use client';

import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const routes = useRouter();
  var token = localStorage.getItem('token');
  useEffect(() => {
    token = localStorage.getItem('token');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        params: { username: username, password: password },
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      if (response.data.accessToken) {
        routes.push('/userpage');
      }
    } catch (error) {
      setAlertMessage('Error logging in: ' + error.message);
      setIsError(true);
      console.error('Error logging in:', error);
    }
  };

  const handleRegister = () => {
    routes.push('/register/');
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {alertMessage && (
        <div className={isError ? 'alert error' : 'alert success'}>
          {alertMessage}
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-button">
          <input type="submit" value="Login" />
        </div>
      </form>
      <div className="form-group-text">
          หากยังไม่มีบัญชี
          <button className="form-rebutton" onClick={handleRegister}>
            Sign in
          </button>
        </div>
    </div>
  );
}

export default Login;