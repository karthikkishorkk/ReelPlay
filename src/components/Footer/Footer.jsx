import React from 'react';
import './Footer.css';
import youtube_icon from '../../assets/youtube_icon.png';
import twitter_icon from '../../assets/twitter_icon.png';
import instagram_icon from '../../assets/instagram_icon.png';
import facebook_icon from '../../assets/facebook_icon.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-icons">
        <img src={youtube_icon} alt="YouTube" />
        <img src={twitter_icon} alt="Twitter" />
        <img src={instagram_icon} alt="Instagram" />
        <img src={facebook_icon} alt="Facebook" />
      </div>

      <ul className="footer-links">
        <li>About ReelPlay</li>
        <li>Contact</li>
        <li>Privacy Policy</li>
        <li>Terms & Conditions</li>
        <li>Help & Support</li>
      </ul>

      <p className="copyright-text">© {new Date().getFullYear()} ReelPlay. All rights reserved.</p>
    </div>
  );
};

export default Footer;
