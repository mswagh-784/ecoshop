const BASE_URL = 'https://backend-ecoshop.onrender.com';

const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || `HTTP error! status: ${response.status}`);
  }
  
  return data;
};

export const api = {
  // Auth endpoints
  register: async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  login: async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse(response);
  },

  // Products endpoints
  getProducts: async () => {
    const response = await fetch(`${BASE_URL}/products`);
    return handleResponse(response);
  },

  getProduct: async (id) => {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    return handleResponse(response);
  },

  // Orders endpoints
  createOrder: async (orderData, token) => {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(orderData)
    });
    return handleResponse(response);
  },

  getOrders: async (token) => {
    const response = await fetch(`${BASE_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return handleResponse(response);
  },
};
