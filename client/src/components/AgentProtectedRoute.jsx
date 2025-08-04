import { Navigate } from 'react-router-dom';

const AgentProtectedRoute = ({ children }) => {
  const agentToken = localStorage.getItem('agentToken');
  
  if (!agentToken) {
    return <Navigate to="/agent-login" replace />;
  }

  return children;
};

export default AgentProtectedRoute;