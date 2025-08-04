import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/agents", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAgents(res.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteAgent = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/agents/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAgents((prevAgents) => prevAgents.filter((agent) => agent._id !== id));
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Agents</h1>

      {loading ? (
        <p>Loading agents...</p>
      ) : agents.length === 0 ? (
        <p className="text-gray-600">No agents found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div key={agent._id} className="bg-white p-4 rounded shadow-md">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">{agent.name}</h2>
              <p className="text-sm text-gray-500 mb-3">{agent.email}</p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Phone:</strong> {agent.phone || "N/A"}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <strong>Assigned Tasks:</strong> {agent.tasks?.length || 0}
              </p>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={() => deleteAgent(agent._id)}
              >
                Delete Agent
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
