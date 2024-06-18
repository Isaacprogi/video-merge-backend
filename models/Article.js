const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    avatar: { type: String, required: false },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
    collaborators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Collaborator' }],
    tags: [{ type: String }],
    articleType: { type: String, enum: ['single', 'multi'], default: 'single' },
    visibility: { type: String, enum: ['public', 'private'], default: 'private' },
    status: { type: String, enum: ['draft', 'created', 'published', 'scheduled'], default: 'draft' },
    publishedDate: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);
