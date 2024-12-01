import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-left">
        <div className="footer-logo">
          {/* Using SVG inline for the logo */}
          <img src="https://pump.fun/_next/image?url=%2Flogo.png&w=32&q=75" alt="PUMPFUN CASINO Logo"></img>
          <p>Pumpfun Casino offers a thrilling online gaming experience with a variety of exciting games. Join us today for fast, secure, and enjoyable gameplay across the latest slots, table games, and more!</p>
        </div>
        <div className="footer-license">
          <h4>License Certificate</h4>
          <p>Pumpfun Casino is operated by Alpha Gaming Ltd., a company registered and established under the laws of Curacao. Alpha Gaming Ltd. is licensed and regulated by the Curacao Gaming Control Board (OGL/2024/8765). Our registered office is located at 123 Gaming St., Willemstad, Curacao.</p>
          <p className="license-note">Note: Trading cryptocurrencies is not considered gambling and is not covered by our gaming license.</p>
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-links">
          <h4>Platform</h4>
          <ul>
            <li><a href="#">Provability Explained</a></li>
            <li><a href="#">Responsible Gambling</a></li>
            <li><a href="#">Self Exclusion</a></li>
            <li><a href="#">Sportsbook Terms</a></li>
          </ul>
          <h4>About Us</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">AML Policy</a></li>
          </ul>
          <select className="language-dropdown">
            <option>English</option>
            <option>Español</option>
            <option>Français</option>
          </select>
        </div>
        <div className="footer-socials">
          <ul>
         {/*  <h4>Follow Us</h4>
            Using SVG icons for social media 
            <li><a href="#"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="gold"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" stroke="white" /></svg></a></li>
            <li><a href="#"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="gold"><circle cx="12" cy="12" r="10" /><path d="M10 8h4v8h-4z" fill="white" /></svg></a></li>
            <li><a href="#"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="gold"><circle cx="12" cy="12" r="10" /><path d="M8 10h8v4H8z" fill="white" /></svg></a></li>
            <li><a href="#"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="gold"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" stroke="white" /><path d="M10 10h4v4h-4z" fill="white" /></svg></a></li>
            */}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Pumpfun Casino. All rights reserved. Visit us at <a href="https://www.pumpfun.casino">pumpfun.casino</a></p>
      </div>
    </footer>
  );
};

export default Footer;
