// frontend/src/pages/ResetPassword.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../services/authService';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setMessage({
        text: 'Invalid or missing reset token. Please request a new password reset link.',
        isError: true
      });
    }
  }, [token]);

  const validateForm = () => {
    if (password !== confirmPassword) {
      setMessage({ text: "Passwords don't match", isError: true });
      return false;
    }
    
    if (password.length < 8) {
      setMessage({ text: "Password must be at least 8 characters", isError: true });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token || !validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setMessage(null);
    
    try {
      await resetPassword(token, password);
      setMessage({ 
        text: "Password reset successful! Redirecting to login...", 
        isError: false 
      });
      
      // Redirect to login after successful reset
      setTimeout(() => {
        navigate('/login', { 
          state: { message: 'Password reset successful! You can now log in with your new password.' } 
        });
      }, 3000);
    } catch (err) {
      setMessage({ 
        text: err.message || "Failed to reset password. The link may have expired.", 
        isError: true 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="form-container">
        <h1>Reset Your Password</h1>
        
        {message && (
          <div className={`message ${message.isError ? 'error' : 'success'}`}>
            {message.text}
          </div>
        )}
        
        {token && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                {isLoading ? 'Resetting Password...' : 'Reset Password'}
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
        )}
      </div>
    </div>
  );
};

export default ResetPassword;