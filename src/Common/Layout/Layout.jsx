// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/Navigator/Navigator'; // Adjust the path according to your project structure
import {CopyRights} from '../../Components/Footer/Footer'; // Adjust the path according to your project structure

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <CopyRights />
    </>
  );
};

export default Layout;
