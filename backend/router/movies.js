const express = require('express');
const router = express.Router();
const Movie = require('../models/movieCollection');

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const itemPerPage = 10;

    const results = await Movie.find()
      .skip(itemPerPage * (page - 1))
      .limit(itemPerPage);

    res.json(results);
  } catch (err) {
    console.error('Error fetching paginated movies:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
