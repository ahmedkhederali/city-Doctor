import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../Helper/helper';
import PropTypes from "prop-types"; // Import PropTypes

const ProtectedRoute = ({ element, allowedRoles }) => {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired, // Expecting a React element
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired // Expecting an array of strings
  };
export default ProtectedRoute;
