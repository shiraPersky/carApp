// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FaBell, FaWrench, FaGasPump, FaChartLine } from 'react-icons/fa';
// import '../styles/FooterNav.css';

// const FooterNav = () => {
//   const location = useLocation();
  
//   const isActive = (path: string) => {
//     return location.pathname.startsWith(path) ? 'active' : '';
//   };
  
//   return (
//     <div className="footer-nav">
//       <Link to="/reminders" className={`footer-nav-item ${isActive('/reminders')}`}>
//         <FaBell className="footer-icon" />
//         <span className="footer-label">Reminders</span>
//       </Link>
//       <Link to="/services" className={`footer-nav-item ${isActive('/services')}`}>
//         <FaWrench className="footer-icon" />
//         <span className="footer-label">Services</span>
//       </Link>
//       <Link to="/refuels" className={`footer-nav-item ${isActive('/refuels')}`}>
//         <FaGasPump className="footer-icon" />
//         <span className="footer-label">Refuel</span>
//       </Link>
//       <Link to="/fuel-statistics" className={`footer-nav-item ${isActive('/fuel-statistics')}`}>
//         <FaChartLine className="footer-icon" />
//         <span className="footer-label">Analysis</span>
//       </Link>
//     </div>
//   );
// };

// export default FooterNav;

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBell, FaWrench, FaGasPump, FaChartLine, FaHome } from 'react-icons/fa';
import '../styles/FooterNav.css';

const FooterNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path)) ? 'active' : '';
  };
  
  return (
    <div className="footer-nav">
      <Link to="/" className={`footer-nav-item ${isActive('/')}`}>
        <FaHome className="footer-icon" />
        <span className="footer-label">Home</span>
      </Link>
      <Link to="/reminders" className={`footer-nav-item ${isActive('/reminders')}`}>
        <FaBell className="footer-icon" />
        <span className="footer-label">Reminders</span>
      </Link>
      <Link to="/services" className={`footer-nav-item ${isActive('/services')}`}>
        <FaWrench className="footer-icon" />
        <span className="footer-label">Services</span>
      </Link>
      <Link to="/refuels" className={`footer-nav-item ${isActive('/refuels')}`}>
        <FaGasPump className="footer-icon" />
        <span className="footer-label">Refuel</span>
      </Link>
      <Link to="/fuel-statistics" className={`footer-nav-item ${isActive('/fuel-statistics')}`}>
        <FaChartLine className="footer-icon" />
        <span className="footer-label">Analysis</span>
      </Link>
    </div>
  );
};

export default FooterNav;