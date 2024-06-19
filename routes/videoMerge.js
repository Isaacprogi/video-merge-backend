const router = require('express').Router();
const { videoMerge } = require('../controllers/videoMerge.js');
const { mediaUpload } = require('../config/multerConfig.js'); 


// Route for merging videos with multer middleware
router.post('/merge', mediaUpload.fields([{ name: 'videoA' }, { name: 'videoB' }]), videoMerge);

module.exports = router;

