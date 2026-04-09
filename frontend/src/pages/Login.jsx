import { useState } from 'react';
import { useAuth } from '../context.jsx';

const roles = ['Citizen', 'Politician', 'Admin', 'Moderator'];

export default function Login() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [role, setRole] = useState('Citizen');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    login(name.trim(), role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-civic-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg border border-civic-200">
        <h2 className="text-3xl font-bold text-civic-800 mb-4">Welcome to Civic Connect</h2>
        <p className="mb-6 text-sm text-gray-600">Log in as a role to access governance tools for reporting, feedback, and updates.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Full Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-civic-200 bg-civic-50 px-4 py-3 focus:border-civic-500 focus:outline-none"
              placeholder="Enter your name"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-civic-200 bg-civic-50 px-4 py-3 focus:border-civic-500 focus:outline-none"
            >
              {roles.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <button className="w-full rounded-2xl bg-civic-600 px-4 py-3 text-white font-semibold hover:bg-civic-700">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
