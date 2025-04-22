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

  // Hide footer on specific routes
  const hideFooterRoutes = ['/cars'];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

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
