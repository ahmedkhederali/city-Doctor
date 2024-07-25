// src/context/AppContext.js
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState(false);


  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

// Adding PropTypes for validation
AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  export { AppContext, AppProvider };
