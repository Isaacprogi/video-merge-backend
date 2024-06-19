const multer = require('multer');
const path = require('path');
const fs = require('fs');

const mediaStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/');
    
    // Check if the uploads directory exists, if not, create it
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    console.log('Saving file to:', uploadPath);
    cb(null, uploadPath); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    const filename = `${basename}-${Date.now()}${ext}`;
    console.log('Generated filename:', filename);
    cb(null, filename);
  }
});

const filter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'video') {
    console.log('File accepted:', file.originalname);
    return cb(null, true);
  }
  console.log('File rejected:', file.originalname);
  cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
};

const mediaUpload = multer({ 
  storage: mediaStorage, 
  fileFilter: filter
});

module.exports = { mediaUpload };
