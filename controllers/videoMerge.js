require('dotenv/config');
const path = require('path');
const fs = require('fs');
const concat = require('ffmpeg-concat');
const ffmpeg = require('fluent-ffmpeg');
const { promisify } = require('util');

const ffprobePath = process.env.FFPROBE_PATH;
const ffmpegPath = process.env.FFMPEG_PATH;

ffmpeg.setFfprobePath(ffprobePath);
ffmpeg.setFfmpegPath(ffmpegPath);

// Promisify fs.unlink for easier async/await usage
const unlinkAsync = promisify(fs.unlink);

// Function to get video info
const getVideoInfo = (videoPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) {
        reject(err);
      } else {
        resolve(metadata);
      }
    });
  });
};

// Function to process video for a specific resolution
const processVideo = (inputPath, outputPath, resolution) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .videoCodec('libx264')
      .size(resolution)
      .on('error', (err) => {
        console.log(`Error processing video (${resolution}):`, err);
        reject(err);
      })
      .on('progress', (progress) => {
        console.log(`Processing (${resolution}): ${progress.percent}%`);
      })
      .on('end', () => {
        console.log(`Finished processing (${resolution})`);
        resolve(outputPath);
      })
      .run();
  });
};

exports.videoMerge = async (req, res, next) => {
  const { resolution } = req.body;
  if (!resolution) {
    return next({ message: "Please select a resolution" });
  }

  const videoA = req.files.videoA[0];
  const videoB = req.files.videoB[0];
  const outputPath = path.join(__dirname, '../uploads', `mergedVideo-${Date.now()}.mp4`);

  const reencodedVideoAPath = path.join(__dirname, '../uploads', `reencoded_videoA-${Date.now()}.mp4`);
  const reencodedVideoBPath = path.join(__dirname, '../uploads', `reencoded_videoB-${Date.now()}.mp4`);

  try {
    // Process videos in parallel
    await Promise.all([
      processVideo(videoA.path, reencodedVideoAPath, resolution),
      processVideo(videoB.path, reencodedVideoBPath, resolution)
    ]);

    // Merge videos
    await concat({
      output: outputPath,
      videos: [reencodedVideoAPath, reencodedVideoBPath],
      transition: {
        name: 'directionalWipe',
        duration: 1000,
      },
      concurrency: 4,
      log: console.log,
    });

    // Send the merged video file as a downloadable response
    res.download(outputPath, 'merged-video.mp4', async (err) => {
      if (err) {
        console.error('Error sending file:', err);
        return next({ message: "Error sending merged video file" });
      }

      // Clean up files
      try {
        await Promise.all([
          unlinkAsync(videoA.path),
          unlinkAsync(videoB.path),
          unlinkAsync(reencodedVideoAPath),
          unlinkAsync(reencodedVideoBPath),
          unlinkAsync(outputPath)
        ]);
      } catch (cleanupError) {
        console.error('Error cleaning up files:', cleanupError);
      }
    });
  } catch (error) {
    console.error('Error merging videos:', error);
    return next({ message: "Internal server error" });
  }
};
