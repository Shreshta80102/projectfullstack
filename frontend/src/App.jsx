import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context.jsx';
import TopNav from './components/TopNav.jsx';
import Login from './pages/Login.jsx';
import CitizenDashboard from './pages/CitizenDashboard.jsx';
import PoliticianDashboard from './pages/PoliticianDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ModeratorDashboard from './pages/ModeratorDashboard.jsx';
import ReportIssue from './pages/ReportIssue.jsx';
import SubmitFeedback from './pages/SubmitFeedback.jsx';
import PostUpdate from './pages/PostUpdate.jsx';

function AppRoutes() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-civic-50">
      <TopNav />
      <main className="p-4 md:p-6">
        <Routes>
          <Route
            path="/dashboard"
            element={
              user.role === 'Citizen' ? <CitizenDashboard /> :
              user.role === 'Politician' ? <PoliticianDashboard /> :
              user.role === 'Admin' ? <AdminDashboard /> :
              user.role === 'Moderator' ? <ModeratorDashboard /> :
              <Navigate to="/login" />
            }
          />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/feedback" element={<SubmitFeedback />} />
          <Route path="/update" element={<PostUpdate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return <AppRoutes />;
}
