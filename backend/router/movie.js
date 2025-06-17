const express = require('express');
const router = express.Router();
const Movie = require('../models/movieCollection');

router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id });

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
  } catch (err) {
    console.error('Error fetching movie by ID:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
