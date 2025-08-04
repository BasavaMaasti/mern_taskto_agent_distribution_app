const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');

exports.addAgent = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    // Validate input
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for existing agent with the same email
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(409).json({ message: 'Agent with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save agent
    const newAgent = new Agent({ name, email, phone, password: hashedPassword });
    await newAgent.save();

    res.status(201).json({ message: 'Agent created successfully', agent: newAgent });
  } catch (error) {
    console.error('Error adding agent:', error);
    res.status(500).json({ message: 'Server error while adding agent' });
  }
};

exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().populate('tasks');
    res.status(200).json(agents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ message: 'Server error while fetching agents' });
  }
};
// DELETE /api/agents/:id
exports.deleteAgent = async (req, res) => {
  try {
    const agentId = req.params.id;
    await Agent.findByIdAndDelete(agentId);
    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete agent' });
  }
};

const jwt = require('jsonwebtoken');

exports.loginAgent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if agent exists
    const agent = await Agent.findOne({ email });
    if (!agent) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { agentId: agent._id, role: 'agent' }, // payload
      process.env.JWT_SECRET,                // secret key
      { expiresIn: '1d' }                    // token expiry
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        phone: agent.phone
      }
    });
  } catch (error) {
    console.error('Agent login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

