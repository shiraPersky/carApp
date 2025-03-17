// frontend/src/pages/ForgotPassword.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '../../services/authService';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await requestPasswordReset(email);
      setMessage({ 
        text: "Password reset link sent! Please check your email.", 
        isError: false 
      });
      
      // Reset form
      setEmail('');
      
      // Auto-redirect after a few seconds
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    } catch (error) {
      setMessage({ 
        text: error.message || "Failed to send reset link. Please try again.", 
        isError: true 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="form-container">
        <h1>Reset Your Password</h1>
        
        {message && (
          <div className={`message ${message.isError ? 'error' : 'success'}`}>
            {message.text}
          </div>
        )}
        
        <p>Enter your email address and we'll send you a link to reset your password.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="primary-button"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
            
            <button 
              type="button" 
              className="secondary-button"
              onClick={() => navigate('/login')}
              disabled={isLoading}
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;