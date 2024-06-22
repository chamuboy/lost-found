import React from 'react';
import '../styles/footer.css';

import instagramLogo from '../images/insta.png';
import facebookLogo from '../images/facebook.png';
import twitterLogo from '../images/x.svg';

const Footer = () => {

    const handleRedirect = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/">Home</a>
        <a href="/about-us">About Us</a>
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/help">Help</a>
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>
      <div className="footer-contact">
        <h3>Contact Us</h3>
        <p>Email: chamu4442@gmail.com</p>
        <p>Phone: +94710424806</p>
      </div>
      <div className="footer-social">
        <img src={instagramLogo} alt="Instagram" onClick={() => handleRedirect('https://www.instagram.com/chamuboy_99/')} />
        <img src={facebookLogo} alt="Facebook" onClick={() => handleRedirect('https://www.facebook.com/dinuwan.tennakoon/')} />
        <img src={twitterLogo} alt="Twitter" onClick={() => handleRedirect('https://x.com/chamuboy99')} />
      </div>
      <div className="footer-copyright">
        <p>&copy; 2024 Lost and Found App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
