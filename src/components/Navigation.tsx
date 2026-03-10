import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-100">
              <span className="text-violet-400">📊</span> Polling App
            </h1>
          </div>
          <div className="flex space-x-2">
            <Link
              to="/user"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/user')
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Vote
            </Link>
            <Link
              to="/admin"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isActive('/admin')
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
