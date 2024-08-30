import React from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-brand">LoanCalc</a>
     
      </div>
    </nav>
  );
};

export default Navbar;
