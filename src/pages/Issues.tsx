import { Plus, Filter } from 'lucide-react'
import { useState } from 'react'

export default function Issues() {
  const [filter, setFilter] = useState('all')

  const issues = [
    { id: 1, title: 'Street lights in Main Street are broken', category: 'Infrastructure', status: 'open', priority: 'high', votes: 45, comments: 12 },
    { id: 2, title: 'Pothole repair needed on Oak Avenue', category: 'Roads', status: 'in_progress', priority: 'medium', votes: 32, comments: 8 },
    { id: 3, title: 'Park facility maintenance', category: 'Parks', status: 'open', priority: 'low', votes: 28, comments: 5 },
    { id: 4, title: 'Noise complaint - Construction site', category: 'Noise', status: 'resolved', priority: 'medium', votes: 18, comments: 3 },
    { id: 5, title: 'Graffiti removal needed - Downtown', category: 'Cleanup', status: 'open', priority: 'low', votes: 22, comments: 7 },
    { id: 6, title: 'Traffic signal malfunction at 5th & Main', category: 'Traffic', status: 'in_progress', priority: 'high', votes: 56, comments: 14 },
  ]

  const filteredIssues = issues.filter(issue => {
    if (filter === 'all') return true
    return issue.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-red-100 text-red-800'
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500'
      case 'medium':
        return 'border-l-4 border-yellow-500'
      case 'low':
        return 'border-l-4 border-blue-500'
      default:
        return 'border-l-4 border-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Community Issues</h1>
            <p className="mt-2 text-gray-600">Report and track civic issues in your community</p>
          </div>
          <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Report Issue
          </button>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <Filter className="w-5 h-5 text-gray-600" />
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Issues
            </button>
            <button
              onClick={() => setFilter('open')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'open'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Open
            </button>
            <button
              onClick={() => setFilter('in_progress')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'in_progress'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'resolved'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Resolved
            </button>
          </div>
        </div>

        {/* Issues List */}
        <div className="space-y-4">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${getPriorityColor(issue.priority)}`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{issue.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {issue.category}
                    </span>
                    <span className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(issue.status)}`}>
                      {issue.status === 'in_progress' ? 'In Progress' : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex gap-6 text-gray-600">
                    <span className="text-sm">👍 {issue.votes} votes</span>
                    <span className="text-sm">💬 {issue.comments} comments</span>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
