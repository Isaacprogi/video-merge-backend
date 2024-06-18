const mongoose = require('mongoose');

const connectDB = (MONGO_URI) => {
  return mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('Connected to database');
    })
    .catch((error) => {
      console.error('Failed to connect to database:', error);
      throw error; 
    });
};

module.exports = connectDB;
