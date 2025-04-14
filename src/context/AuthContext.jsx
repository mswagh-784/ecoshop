import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { setCookie, getCookie, deleteCookie } from '../utils/cookies';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getCookie('auth_token');
    const userData = getCookie('user_data');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.login({ email, password });
      if (response.token) {
        setCookie('auth_token', response.token);
        setCookie('user_data', JSON.stringify(response));
        setUser(response);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    deleteCookie('auth_token');
    deleteCookie('user_data');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
