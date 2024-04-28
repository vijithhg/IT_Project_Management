/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ManagerProtection = () => {
  const navigate = useNavigate(); 
  const token = localStorage.getItem('authToken');
  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      const decodedToken = jwtDecode(token);
      if (decodedToken.userRole !== 2) {
        navigate(-1);
      }
    }
  }, [navigate, token]);

  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.userRole === 2) {
      
      return <Outlet />;
    }
  }

  return null;
};

export default ManagerProtection;
