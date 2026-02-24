import { useState } from 'react'
import { useApp } from '../context'
import { AlertCircle, MessageSquare, Plus, TrendingUp } from 'lucide-react'

export default function PoliticianDashboard() {
  const [activeTab, setActiveTab] = useState<'issues' | 'feedback' | 'postUpdate' | 'myUpdates'>('issues')
  const [updateForm, setUpdateForm] = useState({
    title: '',
    content: '',
    category: '',
  })

  const { issues, feedback, updates, addUpdate } = useApp()

  const handlePostUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (updateForm.title && updateForm.content) {
      addUpdate({
        ...updateForm,
        postedBy: 'Current Politician',
        role: 'politician',
      })
      setUpdateForm({ title: '', content: '', category: '' })
      alert('Update posted successfully!')
    }
  }

  const tabs = [
    { id: 'issues', label: 'Issues', icon: AlertCircle },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'postUpdate', label: 'Post Update', icon: Plus },
    { id: 'myUpdates', label: 'My Updates', icon: TrendingUp },
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

  const myUpdates = updates.filter(u => u.role === 'politician')

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Politician Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage community issues and share updates</p>

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

      {/* Issues Tab */}
      {activeTab === 'issues' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Issues</h2>
          {issues.length > 0 ? (
            issues.map(issue => (
              <div key={issue.id} className="bg-white rounded-xl border-2 border-soft-green-100 p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{issue.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">📍 {issue.location}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(issue.status)}`}>
                    {issue.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{issue.description}</p>
                <div className="flex gap-3 flex-wrap">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
                    {issue.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(issue.priority)}`}>
                    {issue.priority} Priority
                  </span>
                  <span className="px-3 py-1 bg-soft-green-100 text-soft-green-800 rounded-full text-xs font-semibold">
                    👍 {issue.votes || 0} votes
                  </span>
                </div>
                <button className="mt-4 px-4 py-2 bg-soft-green-600 hover:bg-soft-green-700 text-white rounded-lg font-medium transition-colors">
                  Respond to Issue
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No issues available</p>
          )}
        </div>
      )}

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Public Feedback</h2>
          {feedback.length > 0 ? (
            feedback.map(fb => (
              <div key={fb.id} className="bg-white rounded-xl border-2 border-soft-green-100 p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{fb.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">From: {fb.submittedBy}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    fb.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    fb.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {fb.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{fb.content}</p>
                <div className="flex gap-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
                    {fb.category}
                  </span>
                </div>
                <button className="mt-4 px-4 py-2 bg-soft-green-600 hover:bg-soft-green-700 text-white rounded-lg font-medium transition-colors">
                  Respond
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No feedback available</p>
          )}
        </div>
      )}

      {/* Post Update Tab */}
      {activeTab === 'postUpdate' && (
        <div className="bg-white rounded-xl border-2 border-soft-green-200 p-8 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Post Public Update</h2>
          <form onSubmit={handlePostUpdate} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Update Title</label>
              <input
                type="text"
                value={updateForm.title}
                onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                placeholder="What's your update about?"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-green-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
              <textarea
                value={updateForm.content}
                onChange={(e) => setUpdateForm({ ...updateForm, content: e.target.value })}
                placeholder="Share the details of your update"
                rows={4}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-green-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <input
                type="text"
                value={updateForm.category}
                onChange={(e) => setUpdateForm({ ...updateForm, category: e.target.value })}
                placeholder="e.g., Announcement, Project Update, Alert"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-soft-green-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-soft-green-600 hover:bg-soft-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Post Update
            </button>
          </form>
        </div>
      )}

      {/* My Updates Tab */}
      {activeTab === 'myUpdates' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Updates</h2>
          {myUpdates.length > 0 ? (
            myUpdates.map(update => (
              <div key={update.id} className="bg-white rounded-xl border-2 border-soft-green-100 p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{update.title}</h3>
                  <span className="px-3 py-1 bg-soft-green-100 text-soft-green-800 rounded-full text-xs font-semibold">
                    {update.category}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{update.content}</p>
                <p className="text-xs text-gray-500">Posted on {new Date(update.postedAt).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">You haven't posted any updates yet</p>
          )}
        </div>
      )}
    </div>
  )
}
