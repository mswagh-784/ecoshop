import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { formatPrice } from '../utils/formatPrice';
import '../css/Checkout.css';

function Checkout() {
  const { user } = useAuth();
  const { cart, total, clearCart } = useCart();
  const [step, setStep] = useState('address'); // address, payment, confirmation
  const [address, setAddress] = useState({
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        items: cart.map(item => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total,
        shippingAddress: address,
        paymentMethod: 'card' // or selected payment method
      };

      await api.createOrder(orderData, user.token);
      clearCart();
      setStep('confirmation');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <span>{formatPrice(item.price)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <h3>Total: {formatPrice(total)}</h3>
          </div>
        </div>

        {step === 'address' && (
          <form className="address-form" onSubmit={handleAddressSubmit}>
            <h2>Shipping Address</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={address.fullName}
              onChange={e => setAddress({...address, fullName: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Street Address"
              value={address.street}
              onChange={e => setAddress({...address, street: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="City"
              value={address.city}
              onChange={e => setAddress({...address, city: e.target.value})}
              required
            />
            <div className="address-grid">
              <input
                type="text"
                placeholder="State"
                value={address.state}
                onChange={e => setAddress({...address, state: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="ZIP Code"
                value={address.zipCode}
                onChange={e => setAddress({...address, zipCode: e.target.value})}
                required
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={address.phone}
              onChange={e => setAddress({...address, phone: e.target.value})}
              required
            />
            <button type="submit">Continue to Payment</button>
          </form>
        )}

        {step === 'payment' && (
          <div className="payment-section">
            <h2>Payment Method</h2>
            <form onSubmit={handlePaymentSubmit}>
              <div className="payment-options">
                <label>
                  <input type="radio" name="payment" value="card" defaultChecked />
                  Credit/Debit Card
                </label>
                <label>
                  <input type="radio" name="payment" value="upi" />
                  UPI
                </label>
                <label>
                  <input type="radio" name="payment" value="cod" />
                  Cash on Delivery
                </label>
              </div>
              <button type="submit">Place Order</button>
            </form>
          </div>
        )}

        {step === 'confirmation' && (
          <div className="order-confirmation">
            <h2>Order Confirmed!</h2>
            <p>Your order has been placed successfully.</p>
            <p>Order ID: {Math.random().toString(36).substr(2, 9)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
