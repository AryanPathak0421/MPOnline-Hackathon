const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { authMiddleware, optionalAuth } = require('../middleware/auth');

// Get all jobs
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, skill, location } = req.query;
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM jobs WHERE 1=1';
    let params = [];

    if (skill) {
      query += ' AND skills @> ARRAY[$' + (params.length + 1) + ']';
      params.push(skill);
    }

    if (location) {
      query += ' AND location ILIKE $' + (params.length + 1);
      params.push(`%${location}%`);
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Get job recommendations
router.get('/recommendations', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `SELECT j.*, 
              (SELECT COUNT(*) FROM job_applications WHERE job_id = j.id AND user_id = $1) as applied
       FROM jobs j
       JOIN user_skills us ON us.skill_name = ANY(j.skills)
       WHERE us.user_id = $1
       ORDER BY j.created_at DESC LIMIT 10`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

// Apply to job
router.post('/:jobId/apply', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    // Check if already applied
    const existing = await db.query(
      'SELECT id FROM job_applications WHERE user_id = $1 AND job_id = $2',
      [userId, jobId]
    );

    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Already applied to this job' });
    }

    const result = await db.query(
      'INSERT INTO job_applications (user_id, job_id, applied_at) VALUES ($1, $2, NOW()) RETURNING *',
      [userId, jobId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to apply to job' });
  }
});

// Get user applications
router.get('/my/applications', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await db.query(
      `SELECT ja.*, j.title, j.company, j.location 
       FROM job_applications ja
       JOIN jobs j ON ja.job_id = j.id
       WHERE ja.user_id = $1
       ORDER BY ja.applied_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

module.exports = router;
