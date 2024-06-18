const multer = require('multer');
const path = require('path');


const mediaStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    cb(null, `${basename}-${Date.now()}${ext}`);
  }
});

const filter = (req, file, cb) => {
  if (file.mimetype.split('/')[0] === 'video') {
    return cb(null, true);
  }
  cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
};


const mediaUpload = multer({ 
  storage: mediaStorage, 
  fileFilter: filter
});

module.exports = { mediaUpload };
