import React, { useState } from 'react';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          number: phone,
          password: password,
        }),
      });

      if (response.ok) {
        setMessage('Sign up successful!');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage('Sign up failed. Please try again.');
      }
    } catch (error) {
      setMessage('Error connecting to server.');
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
          <h2 style={{ color: 'green', fontWeight: 'bold' }}>Sign Up</h2>
        </div>

        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: 'green',
              color: 'white',
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: '16px',
              border: 'none'
            }}
          >
            Sign Up
          </button>
        </form>

        <div className="mt-3 text-center">
          <p className="text-muted">
            Already have an account?{' '}
            <a href="/login" className="text-success" style={{ textDecoration: 'underline', fontWeight: 'bold' }}>
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;