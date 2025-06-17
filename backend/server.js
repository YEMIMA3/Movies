const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(' MongoDB connected');
}).catch((err) => {
  console.error(' MongoDB connection error:', err);
});

// Routes
app.use('/movies', require('./router/movies'));
app.use('/movie', require('./router/movie'));
app.use('/directors', require('./router/directors'));
app.use('/casts', require('./router/casts'));
app.use('/search', require('./router/search'));
app.use('/comments', require('./router/comments'));

// Home route
app.get('/', (req, res) => {
  res.send('Movie API is running');
});

// Start server
app.listen(7000, () => {
  console.log(' Server running on http://localhost:7000');
});
