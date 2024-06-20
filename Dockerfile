# Use an official Node.js runtime as a parent image
FROM node:20

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libxi-dev \
    libglu1-mesa-dev \
    libx11-dev \
    libxext-dev \
    ffmpeg \
    pkg-config \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

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

# Run the application
CMD ["npm", "start"]