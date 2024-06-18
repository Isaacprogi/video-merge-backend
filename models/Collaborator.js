const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CollaboratorSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  role: { 
    type: String, 
    enum: ['admin', 'contributor', 'viewer', 'reviewer'], 
    default: 'viewer' 
  },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }]
}, { timestamps: true });

module.exports = mongoose.model('Collaborator', CollaboratorSchema);
