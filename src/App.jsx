// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Components/Home/Home';
import SignIn from './Components/Login/LoginForm';
import SignUp from './Components/SignUp/SignUp';
import Layout from './Common/Layout/Layout' // Adjust the path according to your project structure
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          {/* Add other routes here that should include header and footer */}
        </Route>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget_password" element={<ForgetPassword/>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
