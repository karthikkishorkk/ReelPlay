import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/ReelPlayLogo2.png';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const Navbar = () => {
  const navRef = useRef();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="navbar" ref={navRef}>
      <div className="navbar-left">
        <img src={logo} alt="ReelPlay Logo" className="logo" />
        {/* Navigation options removed */}
      </div>

      <div className="navbar-right">
        <img src={bell_icon} alt="Notifications" className="icons" />
        <div className="navbar-profile" onClick={toggleDropdown}>
          <img src={profile_img} alt="Profile" className="profile" />
          <img src={caret_icon} alt="Dropdown" className="caret" />
          {dropdownVisible && (
            <div className="dropdown">
              <p onClick={() => logout()}>Sign out of ReelPlay</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
