// AuthContext.jsx
import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('admin'); // Possible values: 'admin', 'employee', 'third-party'

  const loginAs = (role) => {
    setUserRole(role);
  };

  return (
    <AuthContext.Provider value={{ userRole, loginAs }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
