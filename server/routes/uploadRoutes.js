const express = require('express');
const router = express.Router();

const upload = require('../middleware/multerConfig'); // Multer middleware
const uploadController = require('../controllers/uploadController'); // Correctly import controller
const auth = require('../middleware/authMiddleware'); // JWT middleware

// Route for uploading CSV/XLS/XLSX file
router.post('/', auth, upload.single('file'), uploadController.uploadCSV);

module.exports = router;
