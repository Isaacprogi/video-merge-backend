# Use an official Node.js runtime as a parent image
FROM node:18

# Install system dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    libxi-dev \
    libglu1-mesa-dev \
    libglew-dev \
    mesa-utils \
    xvfb \
    pkg-config \
    libx11-dev \
    libxext-dev \
    libgl1-mesa-glx \
    libosmesa6

# Set the working directory
WORKDIR /usr/src/app

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

# Start Xvfb before running the application
CMD ["sh", "-c", "Xvfb :99 -screen 0 1024x768x24 & npm start"]