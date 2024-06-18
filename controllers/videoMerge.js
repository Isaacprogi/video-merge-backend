// controllers/videoController.js
const path = require('path');
const fs = require('fs');
const { concat } = require('ffmpeg-concat');

exports.videoMerge = async (req, res) => {
  const videoA = req.files.videoA[0];
  const videoB = req.files.videoB[0];
  const outputPath = path.join(__dirname, '../uploads', 'mergedVideo.mp4');

  try {
    await concat({
      output: outputPath,
      videos: [videoA.path, videoB.path],
      transition: {
        name: 'directionalWipe',
        duration: 1000,
      },
    });

    res.json({ mergedVideoUrl: `http://localhost:5173/uploads/mergedVideo.mp4` });
  } catch (error) {
    console.error('Error merging videos:', error);
    res.status(500).send('Error merging videos');
  } finally {
    fs.unlinkSync(videoA.path);
    fs.unlinkSync(videoB.path);
  }
};
