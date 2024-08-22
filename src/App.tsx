import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import ContactsListPage from './pages/ContactsListPage';
import CreateContactPage from './pages/CreateContactPage';
import EditContactPage from './pages/EditContactPage';
import ContactDetailsPage from './pages/ContactDetailsPage';
import SignupPage from './pages/SignupPage'

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contacts" element={isAuthenticated ? <ContactsListPage /> : <Navigate to="/" />} />
        <Route path="/contacts/new" element={isAuthenticated ? <CreateContactPage /> : <Navigate to="/" />} />
        <Route path="/contacts/:id" element={isAuthenticated ? <ContactDetailsPage /> : <Navigate to="/" />} />
        <Route path="/contacts/:id/edit" element={isAuthenticated ? <EditContactPage /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
