import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8080/login', {
      email: email,
      password: password,
    });

    if (response.data.startsWith('Login successful')) {
      // Extract user ID from the message
      const parts = response.data.split(' ');
      const userId = parts[2]; // "123"

      // Store in session
      sessionStorage.setItem('userId', userId);
      sessionStorage.setItem('userEmail', email);

      alert('Login successful!');
      navigate('/myhome');
    } else {
      setError('Invalid email or password');
    }
  } catch (err) {
    setError('Invalid email or password');
  }
};


  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid mb-3"
            style={{ width: '100px' }}
          />
          <h2 className="text-primary font-weight-bold">Sign In</h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="emai" className="form-label">Email</label>
            <input
              type="text"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <div className="mt-3 text-center">
          <p className="text-muted">
            Don't have an account? <a href="/signup" className="text-primary">Sign up here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;