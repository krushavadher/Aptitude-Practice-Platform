import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppBackground from './components/common/AppBackground';
import { ToastProvider } from './components/common/Toast';
import { Navbar, Footer } from './components/common/Layout';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AdminRoute } from './routes/AdminRoute';

// Pages
import Landing from './pages/public/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Topics from './pages/student/Topics';
import Practice from './pages/student/Practice';
import TestSetup from './pages/student/TestSetup';
import TakingTest from './pages/student/TakingTest';
import Styleguide from './pages/Styleguide';

import TestResult from './pages/student/TestResult';

import Dashboard from './pages/student/Dashboard';
import History from './pages/student/History';
import Leaderboard from './pages/student/Leaderboard';
import Profile from './pages/student/Profile';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTopics from './pages/admin/AdminTopics';
import AdminQuestions from './pages/admin/AdminQuestions';
import AdminAi from './pages/admin/AdminAi';
import AdminReview from './pages/admin/AdminReview';
import AdminUsers from './pages/admin/AdminUsers';

// Placeholder Pages
const Placeholder = ({ title }) => (
  <div className="flex-1 flex items-center justify-center p-8 text-center">
    <div>
      <h1 className="text-3xl font-bold text-primary mb-4">{title}</h1>
      <p className="text-secondary">Coming soon!</p>
    </div>
  </div>
);

const NotFound = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
    <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
    <h2 className="text-2xl font-bold text-primary mb-4">Page Not Found</h2>
    <p className="text-secondary mb-8">The page you're looking for doesn't exist.</p>
  </div>
);

const Forbidden = () => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
    <h1 className="text-6xl font-bold text-error mb-4">403</h1>
    <h2 className="text-2xl font-bold text-primary mb-4">Access Denied</h2>
    <p className="text-secondary mb-8">You don't have permission to view this page.</p>
  </div>
);

function AppLayout() {
  const { user, logout } = useAuth();
  const role = user?.role || 'guest';

  return (
    <div className="min-h-screen flex flex-col relative z-0">
      <Navbar userRole={role} onLogout={logout} />

      <main className="flex-1 flex flex-col pt-6 w-full max-w-[1280px] mx-auto px-6">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Student Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/topics" element={<ProtectedRoute><Topics /></ProtectedRoute>} />
          <Route path="/practice/:topicId" element={<ProtectedRoute><Practice /></ProtectedRoute>} />
          <Route path="/test/setup" element={<ProtectedRoute><TestSetup /></ProtectedRoute>} />
          <Route path="/test/:testId" element={<ProtectedRoute><TakingTest /></ProtectedRoute>} />
          <Route path="/results/:testId" element={<ProtectedRoute><TestResult /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/topics" element={<AdminRoute><AdminTopics /></AdminRoute>} />
          <Route path="/admin/questions" element={<AdminRoute><AdminQuestions /></AdminRoute>} />
          <Route path="/admin/ai" element={<AdminRoute><AdminAi /></AdminRoute>} />
          <Route path="/admin/review" element={<AdminRoute><AdminReview /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />

          {/* Fallbacks */}
          {import.meta.env.DEV && <Route path="/styleguide" element={<Styleguide />} />}
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <AppBackground />
          <AppLayout />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
