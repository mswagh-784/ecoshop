import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import '../css/Profile.css';

function Profile({ onLogout }) {
  const [orders, setOrders] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    setUserInfo(user);
    fetchOrders(user.token);
  }, [navigate]);

  const fetchOrders = async (token) => {
    try {
      const data = await api.getOrders(token);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  if (!userInfo) return null;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="profile-grid">
        <div className="profile-info">
          <h2>Personal Information</h2>
          <div className="info-card">
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
          </div>
        </div>

        <div className="orders-section">
          <h2>Order History</h2>
          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <span>Order #{order._id.slice(-6)}</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="order-items">
                    {order.items.map(item => (
                      <div key={item.product} className="order-item">
                        <span>{item.name}</span>
                        <span>Qty: {item.quantity}</span>
                        <span>${item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-footer">
                    <span>Total: ${order.total}</span>
                    <span>Status: {order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
