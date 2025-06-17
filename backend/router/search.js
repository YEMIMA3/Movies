const express = require('express');
const router = express.Router();
const Movie = require('../models/movieCollection');

router.get('/', async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const regex = new RegExp(query, 'i'); 

    const results = await Movie.find({
      $or: [
        { title: regex },
        { fullplot: regex },
        { cast: regex },
        { genres: regex }
      ]
    })
    .limit(20)
    .select('title year genres cast poster');

    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
