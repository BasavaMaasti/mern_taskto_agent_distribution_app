const jwt = require('jsonwebtoken');
const Agent = require('../models/Agent');

// ✅ Register
const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const agent = new Agent({ name, email, password, phone });
    await agent.save();
    res.status(201).json({ message: 'Agent registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering agent' });
  }
};

// ✅ Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const agent = await Agent.findOne({ email });
    if (!agent || agent.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: agent._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login error' });
  }
};

module.exports = {
  register,
  login,
};
