import React from "react";
import { Link } from 'react-router-dom'
import './header.css';

const Header = () => {
  return(
    <div className="header-container">
      <div className="header-logo">
        <Link className="header-link" to="/home">S.H.o.R.T</Link>
      </div>
      <div className="header-stats-link">
      <Link className="header-link header-stats" to="/stats">stats</Link>
      </div>
    </div>
  )
}

export default Header;