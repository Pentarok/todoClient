// src/components/Header.js
import React from 'react';

import './Header.css';
import {Link} from "react-router-dom";
const Header = () => {
  return (
    <div>
    <header className="header">
      <h1>My Colorful Blog</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>

    </div>
  );
}

export default Header;
