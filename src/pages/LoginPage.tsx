import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context'
import { Leaf } from 'lucide-react'
import { Role } from '../types'

export default function LoginPage() {
  const [jobTitle, setJobTitle] = useState('')
  const [selectedRole, setSelectedRole] = useState<Role>('citizen')
  const { login } = useAuth()
  const navigate = useNavigate()

  const roles: { value: Role; label: string; description: string }[] = [
    { value: 'citizen', label: 'Citizen', description: 'Report issues and provide feedback' },
    { value: 'politician', label: 'Politician', description: 'Post updates and respond to issues' },
    { value: 'moderator', label: 'Moderator', description: 'Monitor content and discussions' },
    { value: 'admin', label: 'Admin', description: 'Full platform management and analytics' },
  ]

  const handleLogin = () => {
    if (jobTitle.trim()) {
      login(jobTitle, selectedRole)
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-green-50 to-soft-green-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-soft-green-100 p-4 rounded-full">
                <Leaf className="w-8 h-8 text-soft-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Civic Connect</h1>
            <p className="text-soft-green-600 text-sm mt-2 font-medium">Connecting Citizens & Government</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Job Title Input */}
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700 mb-3">
                Your Name / Title
              </label>
              <input
                id="jobTitle"
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Enter your name or job title"
                className="w-full px-4 py-3 border-2 border-soft-green-200 rounded-lg focus:outline-none focus:border-soft-green-500 focus:ring-2 focus:ring-soft-green-500 focus:ring-opacity-20 transition-all"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Available Roles
              </label>
              <div className="space-y-3">
                {roles.map((role) => (
                  <label
                    key={role.value}
                    className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedRole === role.value
                        ? 'border-soft-green-500 bg-soft-green-50'
                        : 'border-gray-200 hover:border-soft-green-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={selectedRole === role.value}
                        onChange={(e) => setSelectedRole(e.target.value as Role)}
                        className="mt-1 w-5 h-5 accent-soft-green-600"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{role.label}</p>
                        <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={!jobTitle.trim()}
              className="w-full bg-soft-green-600 hover:bg-soft-green-700 disabled:bg-soft-green-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-8"
            >
              Login to Dashboard
            </button>
          </div>

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-soft-green-100 border border-soft-green-300 rounded-lg">
            <p className="text-sm text-soft-green-900 font-medium">
              💡 Demo: Enter any name and select a role to get started
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
