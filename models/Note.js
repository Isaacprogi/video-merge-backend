const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const NoteSchema = new Schema({
  title: { type: String, required: true },
  avatar: { type: String, required: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }], 
  collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collaborator' }], 
  tags: [{ type: String }],
  isSingle: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
