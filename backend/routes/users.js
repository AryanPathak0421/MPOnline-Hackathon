const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware } = require('../middleware/auth');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `SELECT id, email, first_name, last_name, bio, profile_picture_url, created_at
       FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, bio } = req.body;
    const userId = req.user.id;

    const result = await db.query(
      `UPDATE users 
       SET first_name = COALESCE($1, first_name),
           last_name = COALESCE($2, last_name),
           bio = COALESCE($3, bio)
       WHERE id = $4
       RETURNING id, email, first_name, last_name, bio`,
      [firstName, lastName, bio, userId]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get user skills
router.get('/skills', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `SELECT skill_name, proficiency_level, years_of_experience
       FROM user_skills WHERE user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

// Add skill
router.post('/skills', authMiddleware, async (req, res) => {
  try {
    const { skillName, proficiencyLevel, yearsOfExperience } = req.body;
    const userId = req.user.id;

    const result = await db.query(
      `INSERT INTO user_skills (user_id, skill_name, proficiency_level, years_of_experience)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [userId, skillName, proficiencyLevel, yearsOfExperience]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add skill' });
  }
});

// Get assessment history
router.get('/assessment-history', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `SELECT ar.id, ar.assessment_id, a.title, ar.score, ar.completed_at
       FROM assessment_results ar
       JOIN assessments a ON ar.assessment_id = a.id
       WHERE ar.user_id = $1
       ORDER BY ar.completed_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assessment history' });
  }
});

module.exports = router;
