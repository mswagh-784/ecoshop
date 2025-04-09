import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CategoryProducts from './pages/CategoryProducts';
import AllProducts from './pages/AllProducts';
import './App.css';
import './css/style.css';
import './css/Home.css';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import { AuthProvider } from './context/AuthContext';
import Profile from './pages/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app-container">
            <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <Cart />
            <main className="main-content">
              <Routes>
                <Route path="/" element={
                  <div className="welcome-container">
                    <h1>Welcome to EcoShop</h1>
                    <p className="welcome-subtitle">Your sustainable shopping destination</p>
                    <div className="welcome-actions">
                      <Link to="/products" className="primary-btn">Browse Products</Link>
                      {!isLoggedIn && (
                        <Link to="/register" className="secondary-btn">Join Us</Link>
                      )}
                    </div>
                  </div>
                } />
                <Route path="/login" element={<Login onLoginSuccess={handleLogin} />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/categories/:categoryId" element={<CategoryProducts />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/logout" element={<Navigate to="/" replace />} />
                <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
              </Routes>
            </main>
            <footer className="app-footer">
              <p>© {new Date().getFullYear()} EcoShop. All rights reserved.</p>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;