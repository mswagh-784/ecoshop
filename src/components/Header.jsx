import { Link } from 'react-router-dom';
import React from 'react';
import '../css/header.css';
import { useCart } from '../context/CartContext';

function Header({ isLoggedIn, onLogout }) {
  const { cart, setIsCartOpen } = useCart();
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    <header>
      <div className="nav-left">
        <Link to="/" className="logo">E-Shop</Link>
      </div>
      
      <div className="nav-middle">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </div>

      <div className="nav-right">
        {isLoggedIn && (
          <button className="cart-button" onClick={() => setIsCartOpen(true)}>
            <span className="cart-icon">🛒</span>
            {cart?.length > 0 && <span className="cart-count">{cart.length}</span>}
          </button>
        )}
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="profile-link">Profile</Link>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/register" className="auth-link">Register</Link>
          </>
        )}
      </div>

      <button className="mobile-menu" onClick={() => setShowMobileMenu(!showMobileMenu)}>
        ☰
      </button>

      {showMobileMenu && (
        <div className="mobile-nav">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          {isLoggedIn && (
            <button className="cart-button" onClick={() => setIsCartOpen(true)}>
              <span className="cart-icon">🛒 Cart</span>
              {cart?.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
          )}
          {isLoggedIn ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={onLogout} className="logout-button">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;