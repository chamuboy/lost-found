import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      const token = response.data.token;

      login(token);

      // Redirect to dashboard
      navigate('/dashboard');

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      if (errorMessage.includes('Credentials')) {
        setError('Credentials Do Not Match');
      } else if (errorMessage.includes('User')) {
        setError('User Unavailable');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
      console.error('Login failed:', errorMessage);
    }
  };

  return (
    <div className='body2'>
      <div className='container1'>
        <h1 className='logintext'>Login</h1>
        <form onSubmit={onSubmit} className='loginform'>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <input className='inputregister'
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input className='inputregister'
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
              required
            />
          </div>
          <input type="submit" value="Login" />
        </form>
        <div className="return-link">
          <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
