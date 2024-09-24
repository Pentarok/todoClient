// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About</h2>
          <p>
            We are a group of passionate writers dedicated to sharing our knowledge and experiences with the world. Our mission is to inspire, inform, and entertain our readers with high-quality content.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact</h2>
          <p>Email: contact@ourblog.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <ul>
            <li><a href="https://www.facebook.com"><i className="fab fa-facebook-f"></i> Facebook</a></li>
            <li><a href="https://www.twitter.com"><i className="fab fa-twitter"></i> Twitter</a></li>
            <li><a href="https://www.instagram.com"><i className="fab fa-instagram"></i> Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 My Colorful Blog | Designed by GreatSolvers
      </div>
    </footer>
  );
}

export default Footer;

