const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  notes: String,
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }
}, {
  timestamps: true // ✅ this adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('Task', taskSchema);
