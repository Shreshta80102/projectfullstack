import { TrendingUp, Users, AlertCircle, CheckCircle } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    {
      label: 'Total Engagement',
      value: '2,847',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Active Issues',
      value: '124',
      icon: AlertCircle,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      label: 'Resolved Issues',
      value: '342',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Active Projects',
      value: '28',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600',
    },
  ]

  const recentIssues = [
    { id: 1, title: 'Street lights in Main Street are broken', status: 'open', priority: 'high' },
    { id: 2, title: 'Pothole repair needed on Oak Avenue', status: 'in_progress', priority: 'medium' },
    { id: 3, title: 'Park facility maintenance', status: 'open', priority: 'low' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to CitizenHub</h1>
          <p className="mt-2 text-gray-600">Your platform for community engagement and civic participation</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Recent Issues Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Issues</h2>
          <div className="space-y-4">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                    <div className="flex gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        issue.status === 'open' ? 'bg-red-100 text-red-800' :
                        issue.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {issue.status === 'in_progress' ? 'In Progress' : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        issue.priority === 'high' ? 'bg-red-100 text-red-800' :
                        issue.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)} Priority
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
