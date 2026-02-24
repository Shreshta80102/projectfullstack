import { Plus, Users, Calendar } from 'lucide-react'

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Community Park Renovation',
      description: 'Complete renovation of the central park including new playgrounds and seating areas',
      status: 'in_progress',
      progress: 65,
      volunteers: 24,
      startDate: '2024-01-15',
      expectedEnd: '2024-06-30',
      image: '🏞️'
    },
    {
      id: 2,
      title: 'Downtown Street Art Initiative',
      description: 'Beautification project featuring local artists creating murals and public installations',
      status: 'in_progress',
      progress: 40,
      volunteers: 18,
      startDate: '2024-02-01',
      expectedEnd: '2024-08-31',
      image: '🎨'
    },
    {
      id: 3,
      title: 'Community Garden Program',
      description: 'Urban farming initiative to create green spaces and improve food security',
      status: 'planning',
      progress: 20,
      volunteers: 32,
      startDate: '2024-03-01',
      expectedEnd: '2024-09-30',
      image: '🌱'
    },
    {
      id: 4,
      title: 'Elderly Care Support Network',
      description: 'Program connecting volunteers with elderly residents for companionship and assistance',
      status: 'active',
      progress: 80,
      volunteers: 45,
      startDate: '2023-09-01',
      expectedEnd: '2024-12-31',
      image: '❤️'
    },
    {
      id: 5,
      title: 'Youth Education Program',
      description: 'Tutoring and mentorship program for underserved youth in the community',
      status: 'active',
      progress: 75,
      volunteers: 38,
      startDate: '2023-08-15',
      expectedEnd: '2024-07-31',
      image: '📚'
    },
    {
      id: 6,
      title: 'Clean Water Initiative',
      description: 'Environmental project focused on water quality testing and conservation',
      status: 'planning',
      progress: 10,
      volunteers: 12,
      startDate: '2024-04-01',
      expectedEnd: '2024-12-31',
      image: '💧'
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'planning':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Community Projects</h1>
            <p className="mt-2 text-gray-600">Participate in initiatives that make a difference</p>
          </div>
          <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="bg-gray-100 h-32 flex items-center justify-center text-6xl">
                {project.image}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-semibold text-blue-600">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{project.volunteers} volunteers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{project.startDate} to {project.expectedEnd}</span>
                  </div>
                </div>

                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Join Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
