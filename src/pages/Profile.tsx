import { Mail, MapPin, Phone, Edit2 } from 'lucide-react'
import { useState } from 'react'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)

  const profile = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Downtown, Metro City',
    avatar: '👩‍💼',
    bio: 'Passionate about community development and environmental sustainability. Active volunteer and civic advocate.',
    joinDate: 'January 2023',
    contributions: {
      issuesReported: 12,
      projectsJoined: 5,
      votesGiven: 87,
      commentsPosted: 24,
    },
    achievements: [
      { name: 'First Issue Report', icon: '🚀' },
      { name: 'Active Volunteer', icon: '⭐' },
      { name: '10 Contributions', icon: '🏆' },
      { name: 'Community Leader', icon: '👑' },
    ],
    recentActivity: [
      { type: 'issue', title: 'Reported: Street lights repair needed', date: '2024-02-20' },
      { type: 'project', title: 'Joined: Community Park Renovation', date: '2024-02-15' },
      { type: 'vote', title: 'Voted on: Traffic Signal Malfunction', date: '2024-02-10' },
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-6">
              <div className="text-8xl">{profile.avatar}</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
                <p className="text-gray-600 mt-1">{profile.bio}</p>
                <p className="text-gray-500 text-sm mt-2">Joined {profile.joinDate}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2"
            >
              <Edit2 className="w-5 h-5" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{profile.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{profile.location}</span>
            </div>
          </div>
        </div>

        {/* Contributions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Contributions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600">{profile.contributions.issuesReported}</div>
              <p className="text-sm text-gray-600 mt-1">Issues Reported</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600">{profile.contributions.projectsJoined}</div>
              <p className="text-sm text-gray-600 mt-1">Projects Joined</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-600">{profile.contributions.votesGiven}</div>
              <p className="text-sm text-gray-600 mt-1">Votes Given</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-600">{profile.contributions.commentsPosted}</div>
              <p className="text-sm text-gray-600 mt-1">Comments Posted</p>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {profile.achievements.map((achievement) => (
              <div key={achievement.name} className="text-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <p className="text-sm font-semibold text-gray-900">{achievement.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {profile.recentActivity.map((activity, index) => (
              <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                <p className="font-semibold text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-500 mt-1">{activity.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
