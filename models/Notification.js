const mongoose = require('mongoose');

const notificationContentSchema = new mongoose.Schema({
  message: { type: String, required: true }, 
  url: { type: String }, 
  additionalData: { type: mongoose.Schema.Types.Mixed } 
}, { _id: false });

const notificationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['workspace_request', 'follow', 'special_update', 'workspace_request_accept', 'like', 'comment', 'share', 'mention'] 
  },
  content: { type: notificationContentSchema, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
