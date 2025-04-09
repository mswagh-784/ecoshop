const BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Auth endpoints
  register: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  login: (credentials) =>
    fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }).then(res => res.json()),

  // Products endpoints
  getProducts: () => 
    fetch(`${BASE_URL}/products`).then(res => res.json()),

  getProduct: (id) =>
    fetch(`${BASE_URL}/products/${id}`).then(res => res.json()),

  // Orders endpoints
  createOrder: (orderData, token) =>
    fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    }).then(res => res.json()),

  getOrders: (token) =>
    fetch(`${BASE_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(res => res.json()),
};
