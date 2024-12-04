/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from cookies on initialization
    const storedUser = Cookies.get('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); // Restore user from cookies
      } catch (error) {
        console.error('Error parsing user data from cookies:', error);
        Cookies.remove('user'); // Remove invalid cookie if parsing fails
      }
    }
    setLoading(false); // Set loading to false after the check
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render loading state while checking cookies
  }

  // Helper to calculate cookie expiration in hours
  const calculateExpirationDate = (hours) => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + hours * 60 * 60 * 1000);
    return expirationDate;
  };

  const loginUser = (user, hours = 24) => {
    setUser(user);
    Cookies.set('user', JSON.stringify(user), {
      expires: calculateExpirationDate(hours), // Expiration in hours
      secure: true,
      sameSite: 'Strict',
    });
  };

  const logoutUser = () => {
    setUser(null);
    Cookies.remove('user');
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
