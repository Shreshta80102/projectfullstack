import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context'
import { Leaf, LogOut } from 'lucide-react'

export default function TopNav() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'citizen':
        return 'bg-blue-100 text-blue-800'
      case 'politician':
        return 'bg-purple-100 text-purple-800'
      case 'moderator':
        return 'bg-orange-100 text-orange-800'
      case 'admin':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <nav className="bg-white border-b-2 border-soft-green-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-soft-green-100 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-soft-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Civic Connect</h1>
              <p className="text-xs text-soft-green-600 font-medium">Connecting Citizens & Government</p>
            </div>
          </div>

          {/* Right: User Info & Logout */}
          {user && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(user.role)}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-soft-green-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
