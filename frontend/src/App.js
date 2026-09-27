import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import SkillAssessment from './pages/SkillAssessment';
import LearningPaths from './pages/LearningPaths';
import JobMatching from './pages/JobMatching';
import CareerExploration from './pages/CareerExploration';
import ResumeBuild from './pages/ResumeBuild';
import ProfilePage from './pages/ProfilePage';

function App() {
  const { user, checkAuth, loading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  return (
    <Router>
      {user && <Navigation />}
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
        />
        <Route 
          path="/register" 
          element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage />} 
        />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/assessments" 
          element={
            <ProtectedRoute>
              <SkillAssessment />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/learning" 
          element={
            <ProtectedRoute>
              <LearningPaths />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/jobs" 
          element={
            <ProtectedRoute>
              <JobMatching />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/careers" 
          element={
            <ProtectedRoute>
              <CareerExploration />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/resume" 
          element={
            <ProtectedRoute>
              <ResumeBuild />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />

        {/* Default redirect */}
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
