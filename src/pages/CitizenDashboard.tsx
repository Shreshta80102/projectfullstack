
import { useState } from 'react'
import { useApp } from '../context'
import { AlertCircle, MessageSquare, Newspaper, Home } from 'lucide-react'

export default function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'report' | 'feedback' | 'updates'>('overview')
  const [reportForm, setReportForm] = useState({
    title: '',
    description: '',
    category: 'Infrastructure',
    priority: 'Medium',
    location: '',
  })
  const [feedbackForm, setFeedbackForm] = useState({
    title: '',
    content: '',
    category: '',
  })

  const { issues, addIssue, addFeedback, updates } = useApp()

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (reportForm.title && reportForm.description && reportForm.location) {
      addIssue({
        ...reportForm,
        category: reportForm.category as 'Infrastructure' | 'Sanitation' | 'Safety' | 'Other',
        priority: reportForm.priority as 'Low' | 'Medium' | 'High',
        status: 'pending',
        submittedBy: 'Current User',
      })
      setReportForm({ title: '', description: '', category: 'Infrastructure', priority: 'Medium', location: '' })
      alert('Issue reported successfully!')
    }
  }

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (feedbackForm.title && feedbackForm.content) {
      addFeedback({
        ...feedbackForm,
        status: 'pending',
        submittedBy: 'Current User',
      })
      setFeedbackForm({ title: '', content: '', category: '' })
      alert('Feedback submitted successfully!')
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'report', label: 'Report Issue', icon: AlertCircle },
    { id: 'feedback', label: 'Send Feedback', icon: MessageSquare },
    { id: 'updates', label: 'Updates', icon: Newspaper },
  ]

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getPriorityBadge = (priority: 'Low' | 'Medium' | 'High') => {
    const colors = {
      Low: 'bg-blue-100 text-blue-800',
      Medium: 'bg-orange-100 text-orange-800',
      High: 'bg-red-100 text-red-800',
    }
    return colors[priority] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Citizen Dashboard</h1>
      <p className="text-gray-600 mb-8">Welcome! Engage with your community</p>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-soft-green-600 text-soft-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="bg-soft-green-50 border-2 border-soft-green-200 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Civic Connect</h2>
            <p className="text-gray-600">
              Report issues in your community, share feedback with your government, and stay updated with the latest announcements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border-2 border-soft-green-100 p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">📋</div>
              <p className="text-sm text-gray-600">Active Issues</p>
              <p className="text-2xl font-bold text-soft-green-600">{issues.filter(i => i.status !== 'resolved').length}</p>
            </div>
            <div className="bg-white rounded-xl border-2 border-soft-green-100 p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-sm text-gray-600">Resolved Issues</p>
              <p className="text-2xl font-bold text-soft-green-600">{issues.filter(i => i.status === 'resolved').length}</p>
            </div>
            <div className="bg-white rounded-xl border-2 border-soft-green-100 p-6 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-2">📢</div>
              <p className="text-sm text-gray-600">Latest Updates</p>
              <p className="text-2xl font-bold text-soft-green-600">{updates.length}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-soft-green-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Issues</h3>
            <div className="space-y-4">
              {issues.slice(0, 3).map(issue => (
                <div key={issue.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-soft-green-500">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{issue.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(issue.status)}`}>
                      {issue.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{issue.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Report Issue Tab */}
      {activeTab === 'report' && (
        <div className="bg-white rounded-xl border-2 border-soft-green-200 p-8 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Report an Issue</h2>
          <form onSubmit={handleReportSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Title</label>
              <input
                type="text"
                value={reportForm.title}
                onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                placeholder="Briefly describe the issue"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-green-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description</label>
              <textarea
                value={reportForm.description}
                onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                placeholder="Provide more details about the issue"
                rows={4}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-green-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={reportForm.category}
                  onChange={(e) => setReportForm({ ...reportForm, category: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-green-500 focus:outline-none"
                >
                  <option>Infrastructure</option>
                  <option>Sanitation</option>
                  <option>Safety</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                <select
                  value={reportForm.priority}
                  onChange={(e) => setReportForm({ ...reportForm, priority: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-green-500 focus:outline-none"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={reportForm.location}
                onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                placeholder="Where is this issue located?"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-green-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-soft-green-600 hover:bg-soft-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Submit Issue Report
            </button>
          </form>
        </div>
      )}

      {/* Send Feedback Tab */}
      {activeTab === 'feedback' && (
        <div className="bg-white rounded-xl border-2 border-soft-green-200 p-8 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Feedback</h2>
          <form onSubmit={handleFeedbackSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Feedback Title</label>
              <input
                type="text"
                value={feedbackForm.title}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, title: e.target.value })}
                placeholder="What is your feedback about?"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-green-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Feedback Content</label>
              <textarea
                value={feedbackForm.content}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, content: e.target.value })}
                placeholder="Share your thoughts and suggestions"
                rows={4}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-green-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <input
                type="text"
                value={feedbackForm.category}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, category: e.target.value })}
                placeholder="e.g., Suggestion, Appreciation, Complaint"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-green-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-soft-green-600 hover:bg-soft-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      )}

      {/* Updates Tab */}
      {activeTab === 'updates' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Updates</h2>
          {updates.length > 0 ? (
            updates.map(update => (
              <div key={update.id} className="bg-white rounded-xl border-2 border-soft-green-100 p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{update.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">By {update.postedBy}</p>
                  </div>
                  <span className="px-3 py-1 bg-soft-green-100 text-soft-green-800 rounded-full text-xs font-semibold">
                    {update.category}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{update.content}</p>
                <p className="text-xs text-gray-500">{new Date(update.postedAt).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No updates available</p>
          )}
        </div>
      )}
    </div>
  )
}
