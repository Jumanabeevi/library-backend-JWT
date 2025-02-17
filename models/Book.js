const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
});

module.exports = mongoose.model('Book', BookSchema);