const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, unique: true },
  publisher: { type: String, required: true },
  publicationDate: { type: String, required: true },
  genre: { type: String, required: true },
  language: { type: String, required: true },
  coverImage: { type: String, required: true },
  summary: { type: String, required: true },
  totalPages: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
