'use client';

import React, { useEffect, useState } from 'react';
import './style.css';
import { useRouter } from 'next/navigation';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const routes = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
  };

  const handleRegister = () => {
    routes.push('/register/');
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group-text">
          หากยังไม่มีบัญชี
          <button className="form-rebutton" onClick={handleRegister}>
            Sign in
          </button>
        </div>
        <div className="form-button">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
}

export default Login;