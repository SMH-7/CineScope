import { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';

export const PrivateRoute = ({ children}) => {
  const { user } = useContext(UserContext);
      
  if (user != "") {
    return children
  }
    
  return <Navigate to="/login" />
}
