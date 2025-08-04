const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if ([".csv", ".xlsx", ".xls"].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only .csv, .xlsx, .xls files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
