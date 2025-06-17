const express = require('express');
const router = express.Router();
const Comment = require('../models/comments');

router.get('/:movieId', async (req, res) => {
  try {
    const comments = await Comment.find({ movie_id: req.params.movieId });
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;