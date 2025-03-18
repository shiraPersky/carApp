import React from 'react';
import FooterNav from './FooterNav';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <div className="content">
        {children}
      </div>
      <FooterNav />
    </div>
  );
};

export default Layout;