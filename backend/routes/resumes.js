const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware } = require('../middleware/auth');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

// Get user resumes
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `SELECT id, title, file_url, created_at, updated_at
       FROM resumes WHERE user_id = $1
       ORDER BY updated_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
});

// Create resume
router.post('/', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const result = await db.query(
      `INSERT INTO resumes (user_id, title, content, file_url, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING *`,
      [userId, title, content, req.file?.filename || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create resume' });
  }
});

// Optimize resume
router.post('/:id/optimize', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const resumeId = req.params.id;

    // Get resume
    const resume = await db.query(
      'SELECT * FROM resumes WHERE id = $1 AND user_id = $2',
      [resumeId, userId]
    );

    if (resume.rows.length === 0) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // Placeholder: Analyze resume and provide suggestions
    const optimizationSuggestions = {
      score: 72,
      suggestions: [
        { type: 'keyword', message: 'Add more action verbs like "orchestrated", "spearheaded"' },
        { type: 'metrics', message: 'Quantify achievements: "Increased efficiency by 23%"' },
        { type: 'formatting', message: 'Use consistent bullet point formatting' }
      ]
    };

    res.json(optimizationSuggestions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to optimize resume' });
  }
});

// Parse resume
router.post('/parse', upload.single('file'), async (req, res) => {
  try {
    // Placeholder: Parse resume file
    const parsedData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-0100',
      experience: [
        { title: 'Software Engineer', company: 'Tech Corp', years: 3 }
      ],
      skills: ['JavaScript', 'React', 'Node.js'],
      education: [
        { degree: 'B.S. Computer Science', school: 'State University' }
      ]
    };

    res.json(parsedData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse resume' });
  }
});

module.exports = router;
