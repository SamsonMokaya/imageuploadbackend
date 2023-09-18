const multer = require('multer');
const fs = require('fs');

// Configure multer storage and file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, 'image-' + Date.now() + '-' + file.originalname);
  }
});

// Create multer upload instance
const upload = multer({ storage: storage });

// Custom file upload middleware
const uploadMiddleware = (req, res, next) => {
  // Use multer upload instance
  upload.array('files', 5)(req, res, (err) => {
   
    // Retrieve uploaded files
    const files = req.files;

    // Modify file names to 'image' + timestamp
    files.forEach((file) => {
      const newPath = `uploads/${file.originalname}`;
      fs.rename(file.path, newPath, (err) => {
        if (err) {
          console.error('Failed to rename file:', err);
        }
      });
      file.path = newPath;
    });

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = uploadMiddleware;
