import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Route Wrappers
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import AdminRoute from './routes/AdminRoute.jsx';

// Public Pages
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

// Student Pages
import Dashboard from './pages/student/Dashboard.jsx';
import Topics from './pages/student/Topics.jsx';
import Practice from './pages/student/Practice.jsx';
import TestSetup from './pages/student/TestSetup.jsx';
import TestScreen from './pages/student/TestScreen.jsx';
import Result from './pages/student/Result.jsx';
import History from './pages/student/History.jsx';
import Leaderboard from './pages/student/Leaderboard.jsx';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ManageTopics from './pages/admin/ManageTopics.jsx';
import ManageQuestions from './pages/admin/ManageQuestions.jsx';
import AiGenerate from './pages/admin/AiGenerate.jsx';
import ReviewQueue from './pages/admin/ReviewQueue.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Student Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/practice/:topicId" element={<Practice />} />
          <Route path="/test-setup" element={<TestSetup />} />
          <Route path="/test/:testId" element={<TestScreen />} />
          <Route path="/result/:testId" element={<Result />} />
          <Route path="/history" element={<History />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/topics" element={<ManageTopics />} />
          <Route path="/admin/questions" element={<ManageQuestions />} />
          <Route path="/admin/ai-generate" element={<AiGenerate />} />
          <Route path="/admin/review" element={<ReviewQueue />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
