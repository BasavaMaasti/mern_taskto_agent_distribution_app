import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // Changed from '/login' to '/' for landing page
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 shadow-lg">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-1 text-white">
          <Link 
            to="/dashboard" 
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300"
          >
            Dashboard
          </Link>
          <Link 
            to="/add-agent" 
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300"
          >
            Add Agent
          </Link>
          <Link 
            to="/upload-csv" 
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300"
          >
            Upload CSV
          </Link>
          <Link 
            to="/view-tasks" 
            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition duration-300"
          >
            View Tasks
          </Link>
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}