const BASE_URL = import.meta.env.VITE_API_URL || 'https://backend-ecoshop.onrender.com/api';

export const api = {
  // Auth endpoints
  register: (userData) => 
    fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }).then(res => res.json()),

  login: (credentials) =>
    fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }).then(res => res.json()),

  // Products endpoints
  getProducts: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  },

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
    }).then(res => res.json())
};

export default api;
