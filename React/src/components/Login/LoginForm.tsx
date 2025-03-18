
// frontend/src/components/Login/LoginForm.tsx
import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <button type="submit" className="primary-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      
      <div className="forgot-password">
        <a href="/forgot-password">Forgot password?</a>
      </div>
    </form>
  );
};

export default LoginForm;