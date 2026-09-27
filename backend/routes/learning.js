const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

// Get learning paths
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `SELECT * FROM learning_paths 
       WHERE user_id = $1 OR is_template = true
       ORDER BY created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch learning paths' });
  }
});

// Create learning path
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, targetSkills, estimatedWeeks } = req.body;
    const userId = req.user.id;

    const result = await db.query(
      `INSERT INTO learning_paths (user_id, title, description, target_skills, estimated_weeks, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [userId, title, description, targetSkills, estimatedWeeks]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create learning path' });
  }
});

// Get courses for path
router.get('/:pathId/courses', authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT c.*, pc.progress
       FROM courses c
       JOIN path_courses pc ON c.id = pc.course_id
       WHERE pc.path_id = $1
       ORDER BY pc.sequence`,
      [req.params.pathId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Update course progress
router.post('/:pathId/courses/:courseId/progress', authMiddleware, async (req, res) => {
  try {
    const { progress } = req.body;

    const result = await db.query(
      `UPDATE path_courses SET progress = $1, updated_at = NOW()
       WHERE path_id = $2 AND course_id = $3
       RETURNING *`,
      [progress, req.params.pathId, req.params.courseId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

module.exports = router;
