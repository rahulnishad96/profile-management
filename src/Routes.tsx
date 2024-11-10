import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProfileForm from './pages/ProfileForm';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/profile" replace />} />
      
      <Route path="/profile-form" element={<ProfileForm />} />
      <Route path="/profile" element={<Profile />} />
      
      <Route path="/404" element={<NotFound />} />
      
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </Router>
);

export default AppRoutes;
