const mongoose = require ('mongoose');

const bookSchema = new mongoose.Schema ({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'borrowed'],
    default: 'available',
  },
  description: {
    type: String,
    default: '',
  },
  coverImage: {
    type: String,
    default: '',
  },
});

const BookModel = mongoose.model ('Book', bookSchema);

module.exports = BookModel;
