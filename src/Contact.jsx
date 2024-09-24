// src/pages/Contact.js
import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions, comments, or feedback, feel free to reach out to us. We'd love to hear from you!</p>
      <h2>Email</h2>
      <p>contact@ourblog.com</p>
      <h2>Follow Us</h2>
      <ul>
        <li><a href="https://www.facebook.com">Facebook</a></li>
        <li><a href="https://www.twitter.com">Twitter</a></li>
        <li><a href="https://www.instagram.com">Instagram</a></li>
      </ul>
    </div>
  );
}

export default Contact;
