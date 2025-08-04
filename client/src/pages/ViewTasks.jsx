import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/agents/distributed")
      .then((res) => {
        setTasks(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Agent Task Distribution</h1>
            <p className="text-gray-600 mt-2">View tasks assigned to each agent</p>
          </div>
          <Link
            to="/upload-csv"
            className="mt-4 md:mt-0 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-300"
          >
            Upload CSV
          </Link>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No tasks available</h3>
            <p className="mt-1 text-gray-500">Upload a CSV file to distribute tasks to agents</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((entry, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                {/* Agent Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                  <h2 className="text-xl font-semibold text-white truncate">
                    {entry.agent?.name || "Unnamed Agent"}
                  </h2>
                  <p className="text-blue-100 text-sm truncate">
                    {entry.agent?.email || "No email provided"}
                  </p>
                </div>

                {/* Tasks List */}
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium text-gray-500">ASSIGNED TASKS</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {entry.tasks.length} {entry.tasks.length === 1 ? 'task' : 'tasks'}
                    </span>
                  </div>
                  
                  <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {entry.tasks.map((task, idx) => (
                      <li 
                        key={idx}
                        className="border-l-4 border-blue-500 pl-3 py-2 bg-gray-50 rounded"
                      >
                        <p className="text-sm font-medium text-gray-800">
                          <span className="text-gray-500">Name:</span> {task.firstName || "N/A"}
                        </p>
                        <p className="text-sm text-gray-800 mt-1">
                          <span className="text-gray-500">Phone:</span> {task.phone}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="text-gray-500">Notes:</span> {task.notes || "N/A"}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTasks;