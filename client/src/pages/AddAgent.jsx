import React, { useState } from 'react';
import AgentForm from '../components/AgentForm';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AddAgent = () => {
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleAddAgent = async (agentData) => {
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });
    
    try {
      const response = await axios.post('/agents', agentData);
      setMessage({ 
        text: 'Agent added successfully!', 
        type: 'success' 
      });
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      setMessage({ 
        text: error.response?.data?.message || 'Failed to add agent', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-800">
          <h2 className="text-2xl font-bold text-white">Add New Agent</h2>
          <p className="text-blue-100">Fill in the agent details below</p>
        </div>
        
        <div className="p-6 md:p-8">
          <AgentForm 
            onSubmit={handleAddAgent} 
            isSubmitting={isSubmitting} 
          />
          
          {message.text && (
            <div className={`mt-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <p className="font-medium">{message.text}</p>
              {message.type === 'success' && (
                <p className="text-sm mt-1">Redirecting to dashboard...</p>
              )}
            </div>
          )}
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAgent;