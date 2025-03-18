//login form component
// frontend/src/pages/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import LoginForm from '../../components/Login/LoginForm';
import SSOButton from '../../components/Login/SSOButton.tsx';
import { validateSSOToken } from '../../services/authService';

const LoginPage: React.FC = () => {
  const { user, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [ssoMessage, setSSOMessage] = useState<string | null>(null);

  // Check if we have an SSO token in the URL
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      handleSSOLogin(token);
    }
  }, [searchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/cars');
    }
  }, [user, navigate]);

  // Handle SSO token validation
  const handleSSOLogin = async (token: string) => {
    setIsLoading(true);
    try {
      await validateSSOToken(token);
      // Redirect will happen automatically due to user state change
    } catch (err) {
      setSSOMessage(err.message || 'SSO login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>CarApp Login</h1>
        
        {error && (
          <div className="error-message" onClick={clearError}>
            {error}
          </div>
        )}
        
        {ssoMessage && (
          <div className="error-message" onClick={() => setSSOMessage(null)}>
            {ssoMessage}
          </div>
        )}
        
        <LoginForm />
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <SSOButton isLoading={isLoading} />
        
        <div className="register-link">
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;