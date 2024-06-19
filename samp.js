require('dotenv/config');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = process.env.FFMPEG_PATH;
ffmpeg.setFfmpegPath(ffmpegPath);

const args = process.argv.slice(2);

function baseName(str){
    let base = str.substring(str.lastIndexOf('/') + 1);
    if(base.lastIndexOf('.') !== -1){
        base = base.substring(0, base.lastIndexOf("."));
    }
    return base;
}

// Define supported resolutions
const resolutions = {
    'hd': '1280x720',
    'fullhd': '1920x1080',
    'sd': '720x480',
    'standard': '640x480',
};

args.forEach(function(val, index, array){
    const filename = val;
    const basename = baseName(filename);

    // Function to process video for a specific resolution
    function processVideo(resolution){
        ffmpeg(filename)
            .output(`${basename}-${resolution}.mp4`)
            .videoCodec('libx264')
            .size(resolution)
            .on('error', function(err){
                console.log(err)
            })
            .on('progress', function(progress){
                console.log(`Processing (${resolution}): ${progress.percent}%`);
            })
            .on('end', function(){
                console.log(`Finished processing (${resolution})`);
            })
            .run();
    }

    const selectedResolution = resolutions.standard;
    console.log(selectedResolution)

    // Process video only for the selected resolution
    if (selectedResolution) {
        processVideo(selectedResolution);
    } else {
        console.error(`Unsupported resolution: ${selectedResolution}`);
    }
});
