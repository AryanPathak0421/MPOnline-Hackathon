const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { optionalAuth } = require('../middleware/auth');

// Get all career paths
router.get('/', optionalAuth, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, title, description, salary_range, job_market_demand, skills_required
       FROM career_paths
       ORDER BY created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch career paths' });
  }
});

// Get specific career path
router.get('/:id', async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM career_paths WHERE id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Career path not found' });
    }

    const career = result.rows[0];

    // Get related jobs
    const jobsResult = await db.query(
      `SELECT title, company, salary FROM jobs 
       WHERE title ILIKE $1 LIMIT 10`,
      [`%${career.title}%`]
    );

    res.json({
      ...career,
      relatedJobs: jobsResult.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch career path' });
  }
});

// Get career recommendations
router.get('/:id/recommendations', optionalAuth, async (req, res) => {
  try {
    const careerPath = await db.query(
      'SELECT skills_required FROM career_paths WHERE id = $1',
      [req.params.id]
    );

    if (careerPath.rows.length === 0) {
      return res.status(404).json({ error: 'Career not found' });
    }

    const skillsRequired = careerPath.rows[0].skills_required;

    // Get learning resources
    const coursesResult = await db.query(
      `SELECT id, title, platform, url, duration 
       FROM learning_resources 
       WHERE topic = ANY($1)
       LIMIT 20`,
      [skillsRequired]
    );

    res.json({
      requiredSkills: skillsRequired,
      recommendedCourses: coursesResult.rows
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

module.exports = router;
