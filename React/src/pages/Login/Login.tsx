
// // frontend/src/pages/Login/Login.tsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useAuth } from '../../Context/AuthContext';
// import LoginForm from '../../components/Login/LoginForm';
// import SSOButton from '../../components/Login/SSOButton';
// import { validateSSOToken } from '../../services/authService';

// const LoginPage: React.FC = () => {
//   const { user, error, clearError } = useAuth();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [isLoading, setIsLoading] = useState(false);
//   const [ssoMessage, setSSOMessage] = useState<string | null>(null);

//   // Check if we have an SSO token in the URL
//   useEffect(() => {
//     const token = searchParams.get('token');
//     if (token) {
//       handleSSOLogin(token);
//     }
//   }, [searchParams]);

//   // Redirect if already logged in
//   useEffect(() => {
//     if (user) {
//       navigate('/cars');
//     }
//   }, [user, navigate]);

//   // Handle SSO token validation
//   const handleSSOLogin = async (token: string) => {
//     setIsLoading(true);
//     try {
//       await validateSSOToken(token);
//       // Redirect will happen automatically due to user state change
//     } catch (err: any) {
//       setSSOMessage(err.message || 'SSO login failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="auth-background">
//         <div className="auth-overlay"></div>
//       </div>
//       <div className="login-container">
//         <h1>Login</h1>
        
//         {error && (
//           <div className="message error" onClick={clearError}>
//             {error}
//           </div>
//         )}
        
//         {ssoMessage && (
//           <div className="message error" onClick={() => setSSOMessage(null)}>
//             {ssoMessage}
//           </div>
//         )}
        
//         <LoginForm />
        
//         <div className="divider">
//           <span>OR</span>
//         </div>
        
//         <SSOButton isLoading={isLoading} />
        
//         <div className="register-link">
//           <p>
//             Don't have an account? <a href="/register">Sign up</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;





// // frontend/src/pages/Login/Login.tsx
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../Context/AuthContext';
// import LoginForm from '../../components/Login/LoginForm';
// import GoogleLoginButton from '..//Login/GoogleLoginButton';


// const LoginPage: React.FC = () => {
//   const { user, error, clearError } = useAuth();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);

//   // Redirect if already logged in
//   useEffect(() => {
//     if (user) {
//       navigate('/cars');
//     }
//   }, [user, navigate]);

//   return (
//     <div className="login-page">
//       <div className="auth-background">
//         <div className="auth-overlay"></div>
//       </div>
//       <div className="login-container">
//         <h1>Login</h1>
        
//         {error && (
//           <div className="message error" onClick={clearError}>
//             {error}
//           </div>
//         )}
        
//         <LoginForm />
        
//         <div className="divider">
//           <span>OR</span>
//         </div>
        
//         {/* Replace SSOButton with GoogleLoginButton */}
//         <GoogleLoginButton isLoading={isLoading} />
        
//         <div className="register-link">
//           <p>
//             Don't have an account? <a href="/register">Sign up</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


// frontend/src/pages/Login/Login.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import LoginForm from '../../components/Login/LoginForm';
import GoogleLoginButton from '../Login/GoogleLoginButton';

const LoginPage: React.FC = () => {
  const { user, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Enhanced redirect logic for already logged in users
  useEffect(() => {
    // Only redirect if we're not still loading and user exists
    if (!loading && user) {
      // Use replace:true to remove login from history stack
      navigate('/home', { replace: true });
    }
  }, [user, loading, navigate]);

  return (
    <div className="login-page">
      <div className="auth-background">
        <div className="auth-overlay"></div>
      </div>
      <div className="login-container">
        <h1>Login</h1>
        
        {error && (
          <div className="message error" onClick={clearError}>
            {error}
          </div>
        )}
        
        <LoginForm />
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        {/* Fix import path and use isLoading state */}
        <GoogleLoginButton isLoading={isLoading} />
        
        <div className="register-link">
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;