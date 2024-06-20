# Use an official Node.js runtime as a parent image
FROM node:16

# Install system dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libgl1-mesa-glx \
    libgl1-mesa-dri \
    mesa-utils \
    xvfb \
    x11-xserver-utils \
    libxext6 \
    libxrender1 \
    libxtst6 \
    libxi6

# Set the working directory
WORKDIR /usr/src/app

# Create necessary directories
RUN mkdir -p /usr/src/app/uploads /tmp

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables for ffmpeg and ffprobe
ENV FFPROBE_PATH=/usr/bin/ffprobe
ENV FFMPEG_PATH=/usr/bin/ffmpeg

# Expose the port the app runs on
EXPOSE 3000

# Use Xvfb to run the application
CMD ["xvfb-run", "--server-args='-screen 0 1280x1024x24'", "npm", "start"]
