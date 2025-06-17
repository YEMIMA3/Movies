const express = require('express');
const router = express.Router();
const Movie = require('../models/movieCollection');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 10;

    const casts = await Movie.distinct("cast"); 

    const start = (page - 1) * itemsPerPage;
    const paginatedCasts = casts.slice(start, start + itemsPerPage);

    res.json(paginatedCasts);
  } catch (err) {
    console.error('Error fetching casts:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
