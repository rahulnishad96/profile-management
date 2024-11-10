import React from 'react';
import AppRoutes from './Routes';
import { ProfileProvider } from './context/ProfileContext';

const App: React.FC = () => (
  <ProfileProvider>
    <AppRoutes />
  </ProfileProvider>
);

export default App;
