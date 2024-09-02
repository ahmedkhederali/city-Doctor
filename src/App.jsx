// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Components/Home/Home';
import SignIn from './Components/Login/LoginForm';
import SignUp from './Components/SignUp/SignUp';
import Layout from './Common/Layout/Layout' // Adjust the path according to your project structure
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import Pharmacies from './Components/Pharmacies/Pharmacies';
import MedicalLabs from './Components/MedicalLabs/MedicalLab';
import SpecialistDoctor from './Components/SpecialistDoctor/SpecialistDoctor';
import DoctorProfile from './Components/DoctorProfile/DoctorProfile';
import MedicalLabProfile from './Components/MedicalLabProfile/MedicalLabProfile';
import PharamacyProfile from './Components/PharamacyProfile/PharamacyProfile';
import Nursing from './Components/Nursing/Nursing';
import NursingProfile from './Components/NursingProfile/NursingProfile';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import ProtectedRoute from './Common/ProtectedRoute/ProtectedRoute'; 
import GetAllDoctors from './Components/Admin/Doctors/GetAllDoctors';
import GetAllMedical from './Components/Admin/MedicalLabs/GetAllMedical';
import GetAllNirsing from './Components/Admin/Nursing/GetAllNirsing';
import GetAllPharamcy from './Components/Admin/Pharmacy/GetAllPharamcy';
import CreateDoctor from './Components/Admin/Doctors/Create_Doctor/CreateDoctor';
import CreateNursing from './Components/Admin/Nursing/create_nursing/CreateNursing';
import CreateMedicalLab from './Components/Admin/MedicalLabs/create_medicalLabs/CreateMedicalLab';
import CreatePharamcy from './Components/Admin/Pharmacy/create_pharamcy/CreatePharamcy';
const App = () => {
  return (
    <Router>
      <Routes>
      <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/nursing" element={<Nursing/>} exact />
          <Route path="/pharmacies" element={<Pharmacies/>} exact />
          <Route path="/medical-labs" element={<MedicalLabs/>} exact />
          <Route path="/specialties/:id" element={<SpecialistDoctor/>} exact />
          <Route path="/doctor_profile/:id" element={<DoctorProfile/>} exact />
          <Route path="/medical_profile/:id" element={<MedicalLabProfile/>} exact />
          <Route path="/pharamcy_profile/:id" element={<PharamacyProfile/>} exact />
          <Route path="/nursing_profile/:id" element={<NursingProfile/>} exact />
          {/* admin Routes */}
          <Route 
            path="/admin-dashboard" 
            element={<ProtectedRoute element={<Dashboard />} allowedRoles={['admin']} />} 
            exact 
          />
          <Route 
            path="/view-doctors" 
            element={<ProtectedRoute element={<GetAllDoctors />} allowedRoles={['admin']} />} 
            exact 
          />
          <Route 
            path="/view-labs" 
            element={<ProtectedRoute element={<GetAllMedical />} allowedRoles={['admin']} />} 
            exact 
          />
          <Route 
            path="/view-pharmacies" 
            element={<ProtectedRoute element={<GetAllPharamcy />} allowedRoles={['admin']} />} 
            exact 
          />
          <Route 
            path="/view-nurses" 
            element={<ProtectedRoute element={<GetAllNirsing />} allowedRoles={['admin']} />} 
            exact 
          />
          <Route 
            path="/add-doctor" 
            element={<ProtectedRoute element={<CreateDoctor />} allowedRoles={['admin']} />} 
            exact 
          />
           <Route 
            path="/edit-doctor/:id" 
            element={<ProtectedRoute element={<CreateDoctor />} allowedRoles={['admin']} />} 
            exact 
          />
           <Route 
            path="/add-nurse" 
            element={<ProtectedRoute element={<CreateNursing />} allowedRoles={['admin']} />} 
            exact 
          />
          <Route 
            path="/edit-nurses/:id" 
            element={<ProtectedRoute element={<CreateNursing />} allowedRoles={['admin']} />} 
            exact 
          />
          <Route 
            path="/add-lab" 
            element={<ProtectedRoute element={<CreateMedicalLab />} allowedRoles={['admin']} />} 
            exact 
          />
           <Route 
            path="/edit-labs/:id" 
            element={<ProtectedRoute element={<CreateMedicalLab />} allowedRoles={['admin']} />} 
            exact 
          />
             <Route 
            path="/add-pharmacy" 
            element={<ProtectedRoute element={<CreatePharamcy />} allowedRoles={['admin']} />} 
            exact 
          />
           <Route 
            path="/edit-pharmacy/:id" 
            element={<ProtectedRoute element={<CreatePharamcy />} allowedRoles={['admin']} />} 
            exact 
          />
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
