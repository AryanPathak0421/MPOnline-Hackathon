const express = require('express');
const cors = require('express-cors');
const helmet = require('helmet');
const rateLimit = require('express-ratelimit');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/users', require('./routes/users.js'));
app.use('/api/assessments', require('./routes/assessments.js'));
app.use('/api/jobs', require('./routes/jobs.js'));
app.use('/api/learning', require('./routes/learning.js'));
app.use('/api/careers', require('./routes/careers.js'));
app.use('/api/resumes', require('./routes/resumes.js'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message,
    status: err.status || 500
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
