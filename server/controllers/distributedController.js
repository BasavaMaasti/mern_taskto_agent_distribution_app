const Task = require('../models/Task');
const Agent = require("../models/Agent");

// Get all agents with their assigned tasks
exports.getDistributedByAgent = async (req, res) => {
  try {
    const agents = await Agent.find({});
    const results = [];

    for (const agent of agents) {
      const tasks = await Task.find({ agent: agent._id });
      results.push({
        agent: {
          id: agent._id,
          name: agent.name,
          email: agent.email,
          phone: agent.phone,
        },
        tasks,
      });
    }

    res.json(results);
  } catch (err) {
    console.error("Get Distributed Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get tasks assigned to the currently logged-in agent
exports.getTasksForAgent = async (req, res) => {
  try {
    const agentId = req.user.id; // ✅ from authMiddleware
    const tasks = await Task.find({ agent: agentId }); // ✅ tasks assigned to the agent
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error getting tasks for agent:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
