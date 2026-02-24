import { Calendar, Share2, Heart } from 'lucide-react'
import { useState } from 'react'

export default function News() {
  const [liked, setLiked] = useState<number[]>([])

  const news = [
    {
      id: 1,
      title: 'City Council Approves New Community Center Budget',
      description: 'The city council has approved a $5 million budget for the construction of a new community center in the downtown area. The facility will include a library, swimming pool, and sports facilities.',
      date: '2024-02-22',
      category: 'Government',
      image: '🏛️',
      likes: 234,
    },
    {
      id: 2,
      title: 'Volunteer Drive: Help Plant 10,000 Trees',
      description: 'Join us for an ambitious environmental initiative to plant 10,000 trees throughout the city. Volunteers of all ages are welcome. Free tools and refreshments provided.',
      date: '2024-02-21',
      category: 'Environment',
      image: '🌳',
      likes: 189,
    },
    {
      id: 3,
      title: 'Street Fair Celebrates Local Diversity',
      description: 'The annual street fair brought thousands of residents together to celebrate the cultural diversity of our community. Local businesses, artists, and performers showcased their talents.',
      date: '2024-02-20',
      category: 'Community',
      image: '🎉',
      likes: 412,
    },
    {
      id: 4,
      title: 'New Public Transportation Routes Launched',
      description: 'The city has launched three new public transportation routes to improve connectivity between neighborhoods. The new routes are now operational and free for the first month.',
      date: '2024-02-19',
      category: 'Infrastructure',
      image: '🚌',
      likes: 267,
    },
    {
      id: 5,
      title: 'Community Garden Reaches 100 Participants',
      description: 'Our community garden initiative has surpassed 100 active participants! Together, they have grown over 500 pounds of fresh vegetables this season.',
      date: '2024-02-18',
      category: 'Agriculture',
      image: '🌾',
      likes: 356,
    },
    {
      id: 6,
      title: 'Scholarship Program Opens for Local Students',
      description: 'A new scholarship program has been announced, offering up to $5,000 to deserving students from underserved communities. Applications open March 1st.',
      date: '2024-02-17',
      category: 'Education',
      image: '🎓',
      likes: 198,
    },
  ]

  const toggleLike = (id: number) => {
    if (liked.includes(id)) {
      setLiked(liked.filter(likeId => likeId !== id))
    } else {
      setLiked([...liked, id])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Community News</h1>
          <p className="mt-2 text-gray-600">Stay updated with the latest happenings in our community</p>
        </div>

        {/* News Feed */}
        <div className="space-y-6">
          {news.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="md:w-48 h-48 md:h-auto bg-gray-100 flex items-center justify-center text-6xl flex-shrink-0">
                  {article.image}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{article.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button
                      onClick={() => toggleLike(article.id)}
                      className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Heart
                        className="w-5 h-5"
                        fill={liked.includes(article.id) ? 'currentColor' : 'none'}
                      />
                      <span>{article.likes + (liked.includes(article.id) ? 1 : 0)}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
            Load More News
          </button>
        </div>
      </div>
    </div>
  )
}
