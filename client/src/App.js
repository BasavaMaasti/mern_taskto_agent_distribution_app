import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import AddAgent from './pages/AddAgent';
import UploadCSV from './pages/UploadCSV';
import ViewTasks from './pages/ViewTasks';
import ProtectedRoute from './components/ProtectedRoute';
import AgentProtectedRoute from './components/AgentProtectedRoute';
import Navbar from './components/Navbar';
import AgentLogin from './pages/AgentLogin';
import AgentDashboard from './components/AgentDashboard';
import LandingPage from './pages/LandingPage';

function AppRoutes() {
  const location = useLocation();

  const showNavbarPaths = [
    '/dashboard',
    '/add-agent',
    '/upload-csv',
    '/view-tasks',
  ];

  const showNavbar = showNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/agent-login" element={<AgentLogin />} />

        {/* Admin Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-agent"
          element={
            <ProtectedRoute>
              <AddAgent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-csv"
          element={
            <ProtectedRoute>
              <UploadCSV />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-tasks"
          element={
            <ProtectedRoute>
              <ViewTasks />
            </ProtectedRoute>
          }
        />

        {/* Agent Protected Route */}
        <Route
          path="/agent-dashboard"
          element={
            <AgentProtectedRoute>
              <AgentDashboard />
            </AgentProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
