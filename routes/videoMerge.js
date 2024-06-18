const router = require('express').Router();
const { mergeVideos } = require('../controllers/videoMerge.js');
const { protect } = require('../middleware/protect.js');
const { mediaUpload } = require('../middleware/multerConfig.js'); 
router.use(protect);

// Route for merging videos with multer middleware
router.post('/merge', mediaUpload.fields([{ name: 'videoA' }, { name: 'videoB' }]), mergeVideos);

module.exports = router;
