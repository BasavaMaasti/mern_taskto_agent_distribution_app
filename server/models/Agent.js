const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('Agent', agentSchema);
