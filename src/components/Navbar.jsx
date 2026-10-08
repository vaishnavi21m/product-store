import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        MiniShop
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Products
        </Link>
        <Link to="/cart" className="nav-link">
          Cart <span className="cart-badge">{cartCount}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
