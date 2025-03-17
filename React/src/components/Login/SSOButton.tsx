// frontend/src/components/Login/SSOButton.tsx
import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';

interface SSOButtonProps {
  isLoading?: boolean;
}

const SSOButton: React.FC<SSOButtonProps> = ({ isLoading = false }) => {
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const { loginWithSSO } = useAuth();

  const handleSSOClick = () => {
    setShowEmailInput(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginWithSSO(email);
    setShowEmailInput(false);
    setEmail('');
  };

  if (showEmailInput) {
    return (
      <form onSubmit={handleSubmit} className="sso-email-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="sso-buttons">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending link...' : 'Send login link'}
          </button>
          <button 
            type="button" 
            onClick={() => setShowEmailInput(false)}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <button 
      onClick={handleSSOClick} 
      className="sso-button" 
      disabled={isLoading}
    >
      Continue with Email Link
    </button>
  );
};

export default SSOButton;