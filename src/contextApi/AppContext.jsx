// src/context/AppContext.js
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [drawerFWidth, setDrawerFWidth] = useState(240);
  return (
    <AppContext.Provider value={{ drawerFWidth, setDrawerFWidth }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
