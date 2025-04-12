import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../css/Login.css'; // Assuming you have a CSS file for styles
import '../css/style.css';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await api.login({ email, password });
      if (response.token) {
        localStorage.setItem('user', JSON.stringify(response));
        onLoginSuccess();
        navigate('/products');
      } else {
        setError(response.message || 'Invalid credentials');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <div className="remember-me">
          <label>
            <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
            Remember me
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      <p className="login-links"><Link to="/forgot-password">Forgot Password?</Link></p>
      <div className="social-login">
        <button>Login with Google</button>
        <button>Login with Facebook</button>
      </div>
      <p className="register-link">Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}

export default Login;
