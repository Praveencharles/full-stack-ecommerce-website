import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../store';
import { useNavigate, Link } from 'react-router-dom';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/auth/register/`, {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const respData = err.response?.data;
      if (respData) {
        // Handle Django REST framework error formats
        const errMessage = Object.values(respData).flat().join(', ');
        setError(errMessage || 'Registration failed');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container glass">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create an Account</h2>
      
      {error && (
        <div style={{ backgroundColor: 'rgba(248, 81, 73, 0.1)', color: 'var(--danger-color)', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', textAlign: 'center' }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{ backgroundColor: 'rgba(46, 160, 67, 0.1)', color: 'var(--success-color)', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', textAlign: 'center' }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Username</label>
          <input 
            type="text" 
            name="username"
            value={formData.username} 
            onChange={handleChange} 
            required 
            placeholder="Choose a username"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
          <input 
            type="email" 
            name="email"
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
          <input 
            type="password" 
            name="password"
            value={formData.password} 
            onChange={handleChange} 
            required 
            placeholder="Create a strong password"
            minLength="8"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Confirm Password</label>
          <input 
            type="password" 
            name="confirmPassword"
            value={formData.confirmPassword} 
            onChange={handleChange} 
            required 
            placeholder="Repeat password"
          />
        </div>
        
        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={loading}>
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--accent-color)', fontWeight: '500' }}>Login</Link>
      </p>
    </div>
  );
}

export default SignupPage;
