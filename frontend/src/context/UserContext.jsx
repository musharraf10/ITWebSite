import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
});

export const UserContextProvider = ({ children }) => {
  const [employeesData, setEmployeesData] = useState([]);
  const navigate = useNavigate(); 

  const getEmployees = async () => {
    try {
      const response = await client.get('/users');
      setEmployeesData(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data.message)
    }
  };

  

  const validateEmail = async (email) => {
    try {
      const response = await client.post('/validate-email', { email });
      return response.data.exists;
    } catch (error) {
      console.error('Error validating email:', error);
      throw new Error('Failed to validate email');
    }
  };

  const Login = async (email, password) => {
    try {
      const request = await client.post('/login', {
        email,
        password,
      });
      console.log(request.status)
      if (request.status === 200) {
        localStorage.setItem('token', request.data.token);
        localStorage.setItem('user', {email});
        navigate('/test');
      }
    } catch (e) {
      console.log(e);
      throw new Error('Login failed');
    }
  };

  const data = {
    employeesData,
    getEmployees,
    validateEmail,
    Login
    
  };

  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
};
