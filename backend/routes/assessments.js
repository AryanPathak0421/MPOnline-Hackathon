const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware } = require('../middleware/auth');


// Get all assessments
router.get('/', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, title, description, type, duration, created_at FROM assessments LIMIT 50'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assessments' });
  }
});

// Get specific assessment
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM assessments WHERE id = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assessment' });
  }
});

// Start assessment
router.post('/:id/start', authMiddleware, async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const userId = req.user.id;

    const result = await db.query(
      'INSERT INTO assessment_sessions (user_id, assessment_id, started_at) VALUES ($1, $2, NOW()) RETURNING id',
      [userId, assessmentId]
    );

    res.status(201).json({ sessionId: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to start assessment' });
  }
});

// Submit assessment
router.post('/:id/submit', authMiddleware, async (req, res) => {
  try {
    const { answers, sessionId } = req.body;
    const userId = req.user.id;

    // Calculate score (placeholder logic)
    const score = calculateScore(answers);

    const result = await db.query(
      'INSERT INTO assessment_results (user_id, assessment_id, session_id, score, completed_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [userId, req.params.id, sessionId, score]
    );

    res.status(201).json({ result: result.rows[0], score });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit assessment' });
  }
});

function calculateScore(answers) {
  // Placeholder scoring logic
  let score = 0;
  for (let answer of answers) {
    if (answer.correct) score += 10;
  }
  return Math.min(score, 100);
}

module.exports = router;
