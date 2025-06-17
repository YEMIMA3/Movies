const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'movies', required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('comments', commentSchema);