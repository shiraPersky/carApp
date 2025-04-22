// import React from 'react';
// import FooterNav from './FooterNav';

// interface LayoutProps {
//   children: React.ReactNode;
// }

// const Layout = ({ children }: LayoutProps) => {
//   return (
//     <div className="layout">
//       <div className="content">
//         {children}
//       </div>
//       <FooterNav />
//     </div>
//   );
// };

// export default Layout;

import React from 'react';
import { useLocation } from 'react-router-dom';
import FooterNav from './FooterNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  // Define routes where the footer should be hidden
  const hideFooterPrefixes = ['/cars']; // this will match /cars and /cars/add, /cars/edit

  const shouldShowFooter = !hideFooterPrefixes.some((prefix) =>
    location.pathname.startsWith(prefix)
  );

  return (
    <div className="layout">
      <div className="content">
        {children}
      </div>
      {shouldShowFooter && <FooterNav />}
    </div>
  );
};

export default Layout;
