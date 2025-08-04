const express = require('express');
const router = express.Router();

const {
  addAgent,
  getAgents,
  deleteAgent,
  loginAgent
} = require('../controllers/agentController');

const distributedController = require('../controllers/distributedController');
const auth = require('../middleware/authMiddleware');

console.log('agentRoutes file loaded');

// Admin Routes
router.post('/', auth, addAgent);
router.get('/', auth, getAgents);
router.get('/distributed', distributedController.getDistributedByAgent);
router.delete('/:id', auth, deleteAgent);

// Agent Login
router.post('/login', loginAgent);

// Agent Task Access
router.get('/tasks', auth, distributedController.getTasksForAgent);

module.exports = router;
