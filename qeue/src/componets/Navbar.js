import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
  const location = useLocation();

  // Hide navbar on login and register pages
  const hideOnRoutes = ['/login', '/register'];
  if (hideOnRoutes.includes(location.pathname)) {
    return null;
  }

  const menuItems = [
   
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLoginMenu = () => {
    setIsLoginMenuOpen(!isLoginMenuOpen);
  };

  const handleItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Check if current path is home/landing page
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">          <Link to="/" className="logo">
            MediQueue
          </Link>

          {/* Desktop Menu - Only show if NOT on home page */}
          {!isHomePage && (
            <ul className="nav-menu">
              {menuItems.map((item) => (
                <li key={item.name} className="nav-item">
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                    onClick={handleItemClick}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Right side navigation */}
          <div className="nav-right">
            {/* Login Icon */}
            <div className="login-container">
              <button className="login-icon" onClick={toggleLoginMenu}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </button>
              
              {/* Login Dropdown */}
              <div className={`login-dropdown ${isLoginMenuOpen ? 'active' : ''}`}>
                <Link to="/login" className="login-option" onClick={handleLoginClick}>
                  Login
                </Link>
              </div>
            </div>

            {/* Hamburger Menu - Only show if NOT on home page */}
            {!isHomePage && (
              <div 
                className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                onClick={toggleMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Overlay - Only show if NOT on home page */}
        {!isHomePage && (
          <>
            <div 
              className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
              {menuItems.map((item) => (
                <div key={item.name} className="mobile-nav-item">
                  <Link
                    to={item.path}
                    className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                    onClick={handleItemClick}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;