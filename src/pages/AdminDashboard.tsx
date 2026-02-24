import { useApp } from '../context'
import { BarChart3, Users, TrendingUp, Activity } from 'lucide-react'

export default function AdminDashboard() {
  const { issues, feedback, updates } = useApp()

  const activeIssues = issues.filter(i => i.status !== 'resolved').length
  const resolvedIssues = issues.filter(i => i.status === 'resolved').length
  const pendingFeedback = feedback.filter(f => f.status === 'pending').length
  const totalEngagement = issues.length + feedback.length + updates.length

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Platform overview and analytics</p>

      {/* Platform Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border-2 border-soft-green-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Active Issues</p>
              <p className="text-3xl font-bold text-soft-green-600 mt-2">{activeIssues}</p>
            </div>
            <AlertCircle className="w-12 h-12 text-soft-green-100" />
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-soft-green-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Resolved Issues</p>
              <p className="text-3xl font-bold text-soft-green-600 mt-2">{resolvedIssues}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-soft-green-100" />
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-soft-green-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Pending Feedback</p>
              <p className="text-3xl font-bold text-soft-green-600 mt-2">{pendingFeedback}</p>
            </div>
            <MessageSquare className="w-12 h-12 text-soft-green-100" />
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-soft-green-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Engagement</p>
              <p className="text-3xl font-bold text-soft-green-600 mt-2">{totalEngagement}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-soft-green-100" />
          </div>
        </div>
      </div>

      {/* User Distribution */}
      <div className="bg-white rounded-xl border-2 border-soft-green-200 p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-soft-green-600" />
          User Distribution
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-soft-green-50 rounded-lg text-center">
            <p className="text-sm text-gray-600 font-medium">Citizens</p>
            <p className="text-3xl font-bold text-soft-green-600 mt-2">1,247</p>
          </div>
          <div className="p-4 bg-soft-green-50 rounded-lg text-center">
            <p className="text-sm text-gray-600 font-medium">Politicians</p>
            <p className="text-3xl font-bold text-soft-green-600 mt-2">34</p>
          </div>
          <div className="p-4 bg-soft-green-50 rounded-lg text-center">
            <p className="text-sm text-gray-600 font-medium">Moderators</p>
            <p className="text-3xl font-bold text-soft-green-600 mt-2">12</p>
          </div>
          <div className="p-4 bg-soft-green-50 rounded-lg text-center">
            <p className="text-sm text-gray-600 font-medium">Admins</p>
            <p className="text-3xl font-bold text-soft-green-600 mt-2">5</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border-2 border-soft-green-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6 text-soft-green-600" />
          Recent Activity
        </h2>

        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 pt-4 border-t">Recent Issues</h3>
          {issues.slice(0, 5).map(issue => (
            <div key={issue.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{issue.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{issue.category} • {issue.location}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${getStatusBadge(issue.status)}`}>
                {issue.status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 pt-4 border-t">Recent Feedback</h3>
          {feedback.slice(0, 5).map(fb => (
            <div key={fb.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{fb.title}</h4>
                <p className="text-sm text-gray-600 mt-1">From: {fb.submittedBy}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${
                fb.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                fb.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {fb.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 pt-4 border-t mb-4">Recent Updates</h3>
          {updates.slice(0, 5).map(update => (
            <div key={update.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors mb-3">
              <h4 className="font-semibold text-gray-900">{update.title}</h4>
              <p className="text-sm text-gray-600 mt-1">By {update.postedBy} • {update.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AlertCircle(props: any) {
  return <AlertCircleIcon {...props} />
}

function CheckCircle(props: any) {
  return <CheckCircleIcon {...props} />
}

function MessageSquare(props: any) {
  return <MessageSquareIcon {...props} />
}

function AlertCircleIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  )
}

function CheckCircleIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )
}

function MessageSquareIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
    </svg>
  )
}
