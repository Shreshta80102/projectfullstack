import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const AppContext = createContext();
const API_URL = 'http://localhost:8080/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('civic-user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const login = (name, role) => {
    const account = { name, role };
    setUser(account);
    localStorage.setItem('civic-user', JSON.stringify(account));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('civic-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export function AppProvider({ children }) {
  const [issues, setIssues] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/issues`).then((res) => res.json()),
      fetch(`${API_URL}/feedback`).then((res) => res.json()),
      fetch(`${API_URL}/updates`).then((res) => res.json()),
    ]).then(([issuesData, feedbackData, updatesData]) => {
      setIssues(issuesData);
      setFeedback(feedbackData);
      setUpdates(updatesData);
      setLoading(false);
    });
  }, []);

  const addIssue = (issue) => {
    fetch(`${API_URL}/issues`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(issue),
    })
      .then((res) => res.json())
      .then((data) => setIssues((current) => [data, ...current]));
  };

  const addFeedback = (fb) => {
    fetch(`${API_URL}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fb),
    })
      .then((res) => res.json())
      .then((data) => setFeedback((current) => [data, ...current]));
  };

  const addUpdate = (update) => {
    fetch(`${API_URL}/updates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => setUpdates((current) => [data, ...current]));
  };

  const updateIssueStatus = (id, status) => {
    fetch(`${API_URL}/issues/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
      .then((res) => res.json())
      .then((updated) => setIssues((current) => current.map((issue) => (issue.id === id ? updated : issue))));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-civic-50">
        <div className="rounded-3xl bg-white p-8 shadow border border-civic-200 text-center">
          <div className="mb-4 h-10 w-10 animate-spin rounded-full border-4 border-civic-600 border-t-transparent"></div>
          <p className="text-gray-700">Loading platform data...</p>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider value={{ issues, feedback, updates, addIssue, addFeedback, addUpdate, updateIssueStatus }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
