import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AgentDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [agentName, setAgentName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchTasks = useCallback(async (token) => {
    try {
      const res = await axios.get('http://localhost:5000/api/agents/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
      if (err.response?.status === 401) {
        localStorage.removeItem('agentToken');
        navigate('/agent-login');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('agentToken');
    const name = localStorage.getItem('agentName');
    
    if (!token || !name) {
      navigate('/agent-login');
      return;
    }

    setAgentName(name);
    fetchTasks(token);
  }, [fetchTasks, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('agentToken');
    localStorage.removeItem('agentName');
    localStorage.removeItem('agentId');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Agent Dashboard</h1>
            <p className="text-gray-600">Welcome back, {agentName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>

        {error ? (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Assigned Tasks</h2>
            
            {tasks.length === 0 ? (
              <div className="text-center py-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks assigned yet</h3>
                <p className="mt-1 text-gray-500">Your admin will assign tasks to you shortly</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => (
                  <div key={task._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      {task.firstName || 'Unnamed Task'}
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <span className="font-medium">Phone:</span> {task.phone}
                      </p>
                      {task.notes && (
                        <p className="text-gray-700">
                          <span className="font-medium">Notes:</span> {task.notes}
                        </p>
                      )}
                      <p className="text-sm text-gray-500">
                        Assigned on: {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;