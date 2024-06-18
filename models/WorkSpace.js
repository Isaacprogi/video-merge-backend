const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  type: { type: String, required: true },
  item: { type: mongoose.Schema.Types.ObjectId, required: false, refPath: 'items.type' }
});

const WorkSpaceSchema = new Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  items: [itemSchema],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('WorkSpace', WorkSpaceSchema);
