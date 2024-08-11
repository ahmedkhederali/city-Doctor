// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Components/Home/Home';
import SignIn from './Components/Login/LoginForm';
import SignUp from './Components/SignUp/SignUp';
import Layout from './Common/Layout/Layout' // Adjust the path according to your project structure
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import Doctors from './Components/Doctors/Doctor';
import Pharmacies from './Components/Pharmacies/Pharmacies';
import MedicalLabs from './Components/MedicalLabs/MedicalLab';
import SpecialistDoctor from './Components/SpecialistDoctor/SpecialistDoctor';
import DoctorProfile from './Components/DoctorProfile/DoctorProfile';
import MedicalLabProfile from './Components/MedicalLabProfile/MedicalLabProfile';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/doctors" element={<Doctors/>} exact />
          <Route path="/pharmacies" element={<Pharmacies/>} exact />
          <Route path="/medical-labs" element={<MedicalLabs/>} exact />
          <Route path="/specialties/:id" element={<SpecialistDoctor/>} exact />
          <Route path="/doctor_profile/:id" element={<DoctorProfile/>} exact />
          <Route path="/medical_profile/:id" element={<MedicalLabProfile/>} exact />

        </Route>
        <Route path="/login" element={<SignIn />} exact/>
        <Route path="/signup" element={<SignUp />} exact/>
        <Route path="/forget_password" element={<ForgetPassword/>} exact/>
        <Route path="*" element={<Navigate to="/" replace />} exact/>
      </Routes>
    </Router>
  );
};

export default App;
