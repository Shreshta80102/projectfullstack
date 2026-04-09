import { Link } from 'react-router-dom';
import { useAuth } from '../context.jsx';

export default function TopNav() {
  const { user, logout } = useAuth();

  const navLinks = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Report Issue', to: '/report' },
    { label: 'Feedback', to: '/feedback' },
    { label: 'Post Update', to: '/update' },
  ];

  return (
    <header className="bg-white border-b border-civic-200 shadow-sm">
      <div className="mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-4 py-4 max-w-6xl">
        <div>
          <h1 className="text-2xl font-bold text-civic-700">Civic Connect</h1>
          <p className="text-sm text-gray-600">A citizen communication platform for government transparency.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-full border border-civic-200 bg-civic-50 px-4 py-2 text-sm font-medium text-civic-800 hover:bg-civic-100"
            >
              {link.label}
            </Link>
          ))}
          <span className="text-sm text-gray-700">{user.name} ({user.role})</span>
          <button
            onClick={logout}
            className="rounded-full bg-civic-600 px-4 py-2 text-sm font-semibold text-white hover:bg-civic-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
