const express = require('express');
const router = express.Router();
const Movie = require('../models/movieCollection');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const itemsPerPage = 10;

    const directors = await Movie.distinct("directors"); 

    const start = (page - 1) * itemsPerPage;
    const paginatedDirectors = directors.slice(start, start + itemsPerPage);

    res.json(paginatedDirectors);
  } catch (err) {
    console.error('Error fetching directors:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
