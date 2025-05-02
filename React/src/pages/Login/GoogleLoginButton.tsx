// // frontend/src/components/Login/GoogleLoginButton.tsx
// import React, { useEffect } from 'react';
// import { useAuth } from '../../Context/AuthContext';

// interface GoogleLoginButtonProps {
//   isLoading?: boolean;
// }

// const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ isLoading = false }) => {
//   const { loginWithGoogle } = useAuth();

//   useEffect(() => {
//     // Load the Google Sign-In API script
//     const loadGoogleScript = () => {
//       // Check if script already exists
//       if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
//         return;
//       }
      
//       const script = document.createElement('script');
//       script.src = 'https://accounts.google.com/gsi/client';
//       script.async = true;
//       script.defer = true;
//       script.onload = initializeGoogleSignIn;
//       document.body.appendChild(script);
//     };

//     loadGoogleScript();

//     return () => {
//       // Clean up if needed
//       window.google = undefined;
//     };
//   }, []);

//   const initializeGoogleSignIn = () => {
//     if (window.google) {
//       window.google.accounts.id.initialize({
//         client_id: '845798043059-o3657dek6m2ann9o35ceg9j250todsio.apps.googleusercontent.com', 
//         auto_select: false,
//         cancel_on_tap_outside: true,
//       });
      
//       window.google.accounts.id.renderButton(
//         document.getElementById('google-signin-button')!,
//         { 
//           type: 'standard', 
//           theme: 'outline', 
//           size: 'large',
//           text: 'signin_with',
//           shape: 'rectangular',
//           logo_alignment: 'left',
//           width: 250
//         }
//       );
//     }
//   };

//   const handleGoogleResponse = async (response: any) => {
//     if (response.credential) {
//       try {
//         await loginWithGoogle(response.credential);
//         // Auth context will handle the state update and redirection
//       } catch (error) {
//         console.error('Google sign-in error:', error);
//       }
//     }
//   };

//   return (
//     <div className="google-signin-container">
//       <div 
//         id="google-signin-button" 
//         className="google-signin-button"
//         aria-disabled={isLoading}
//       ></div>
//     </div>
//   );
// };

// // Add global type for Google
// declare global {
//   interface Window {
//     google?: {
//       accounts: {
//         id: {
//           initialize: (config: any) => void;
//           renderButton: (element: HTMLElement, options: any) => void;
//           prompt: () => void;
//         }
//       }
//     }
//   }
// }

// export default GoogleLoginButton;






// // frontend/src/components/Login/GoogleLoginButton.tsx
// import React, { useEffect } from 'react';
// import { useAuth } from '../../Context/AuthContext';

// interface GoogleLoginButtonProps {
//   isLoading?: boolean;
// }

// const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ isLoading = false }) => {
//   const { loginWithGoogle } = useAuth();

//   useEffect(() => {
//     // Load the Google Sign-In API script
//     const loadGoogleScript = () => {
//       // Check if script already exists
//       if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
//         return;
//       }
      
//       const script = document.createElement('script');
//       script.src = 'https://accounts.google.com/gsi/client';
//       script.async = true;
//       script.defer = true;
//       script.onload = initializeGoogleSignIn;
//       document.body.appendChild(script);
//     };

//     loadGoogleScript();

//     return () => {
//       // Clean up if needed
//       window.google = undefined;
//     };
//   }, []);

//   // const handleGoogleResponse = async (response: any) => {
//   //   console.log('Full Google response:', response);
//   //   console.log('Google response received:', response);
//   //   if (response.credential) {
//   //     try {
//   //       await loginWithGoogle(response.credential);
//   //       // Auth context will handle the state update and redirection
//   //     } catch (error) {
//   //       console.error('Google sign-in error:', error);
//   //     }
//   //   }
//   // };
//   const handleGoogleResponse = async (response: any) => {
//     console.log('Google response received:', response);
    
//     if (!response || !response.credential) {
//       console.error('Invalid Google response - no credential found');
//       return;
//     }
    
//     try {
//       console.log('Credential received, attempting to login with Google');
//       await loginWithGoogle(response.credential);
//       console.log('Google login successful');
//       // Auth context will handle the state update and redirection
//     } catch (error) {
//       console.error('Google sign-in error:', error);
//     }
//   };

//   const initializeGoogleSignIn = () => {
//     console.log('Google script loaded, initializing...');
//     if (window.google) {
//       window.google.accounts.id.initialize({
//         client_id: '845798043059-o3657dek6m2ann9o35ceg9j250todsio.apps.googleusercontent.com', 
//         callback: handleGoogleResponse, // This is crucial
//         auto_select: false,
//         cancel_on_tap_outside: true,
//       });
      
//       window.google.accounts.id.renderButton(
//         document.getElementById('google-signin-button')!,
//         { 
//           type: 'standard', 
//           theme: 'outline', 
//           size: 'large',
//           text: 'signin_with',
//           shape: 'rectangular',
//           logo_alignment: 'left',
//           width: 250
//         }
//       );

//       // Optionally display the One Tap UI
//       //window.google.accounts.id.prompt();
     
//     }
//   };

//   return (
//     <div className="google-signin-container">
//       <div 
//         id="google-signin-button" 
//         className="google-signin-button"
//         aria-disabled={isLoading}
//       ></div>
//     </div>
//   );
// };


// declare global {
//   interface Window {
//     google?: {
//       accounts: {
//         id: {
//           initialize: (config: any) => void;
//           renderButton: (element: HTMLElement, options: any) => void;
//           prompt: () => void;
//           disableAutoSelect?: () => void; // Optional method
//           revoke?: (callback?: () => void) => void; // Optional method
//           cancel?: () => void; // Optional method
//         }
//       }
//     }
//   }
// }

// export default GoogleLoginButton;


// Update the GoogleLoginButton.tsx
import React, { useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface GoogleLoginButtonProps {
  isLoading?: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ isLoading = false }) => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load the Google Sign-In API script
    const loadGoogleScript = () => {
      // Check if script already exists
      if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    };

    loadGoogleScript();

    return () => {
      // Proper cleanup of Google auth state
      if (window.google?.accounts?.id) {
        try {
          // Try to cancel any ongoing prompts
          if (typeof window.google.accounts.id.cancel === 'function') {
            window.google.accounts.id.cancel();
          }
        } catch (error) {
          console.error('Error cleaning up Google auth:', error);
        }
      }
    };
  }, []);

  const handleGoogleResponse = async (response: any) => {
    console.log('Google response received:', response);
    
    if (!response || !response.credential) {
      console.error('Invalid Google response - no credential found');
      return;
    }
    
    try {
      console.log('Credential received, attempting to login with Google');
      await loginWithGoogle(response.credential);
      console.log('Google login successful');
      
      // Explicitly navigate to home after successful login
      navigate('/home', { replace: true });
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const initializeGoogleSignIn = () => {
    console.log('Google script loaded, initializing...');
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '845798043059-o3657dek6m2ann9o35ceg9j250todsio.apps.googleusercontent.com', 
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button')!,
        { 
          type: 'standard', 
          theme: 'outline', 
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: 250
        }
      );
    }
  };

  return (
    <div className="google-signin-container">
      <div 
        id="google-signin-button" 
        className="google-signin-button"
        aria-disabled={isLoading}
      ></div>
    </div>
  );
};

export default GoogleLoginButton;