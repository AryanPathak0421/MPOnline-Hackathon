# CareerBoost Backend

AI-Powered Career Readiness & Employability Platform Backend

## Overview

CareerBoost is a comprehensive platform designed to help individuals achieve career readiness and improve their employability. The backend is built with Node.js and Express.js, providing RESTful APIs for skill assessments, job matching, learning paths, resume optimization, and career exploration.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Cache:** Redis
- **Authentication:** JWT (RS256)
- **Password Hashing:** bcryptjs
- **File Upload:** Multer
- **Security:** Helmet, Express Rate Limit

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm
- PostgreSQL 12+
- Redis

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create .env file from .env.example:
```bash
cp .env.example .env
```

3. Configure your environment variables in .env

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Project Structure

```
backend/
├── config/           # Configuration files (database, etc.)
├── middleware/       # Custom middleware (auth, error handling)
├── routes/          # API route definitions
├── models/          # Database models and schemas
├── controllers/     # Business logic (to be implemented)
├── services/        # External service integrations
├── utils/           # Helper functions and utilities
├── server.js        # Main server entry point
├── .env.example     # Environment variables template
└── package.json     # Dependencies and scripts
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/skills` - Get user skills
- `POST /api/users/skills` - Add new skill
- `GET /api/users/assessment-history` - Get past assessments

### Assessments
- `GET /api/assessments` - Get all assessments
- `GET /api/assessments/:id` - Get assessment details
- `POST /api/assessments/:id/start` - Start assessment
- `POST /api/assessments/:id/submit` - Submit assessment answers

### Jobs
- `GET /api/jobs` - Get job listings
- `GET /api/jobs/recommendations` - Get personalized recommendations
- `POST /api/jobs/:jobId/apply` - Apply for job
- `GET /api/jobs/my/applications` - Get user applications

### Learning
- `GET /api/learning` - Get learning paths
- `POST /api/learning` - Create new learning path
- `GET /api/learning/:pathId/courses` - Get courses in path
- `POST /api/learning/:pathId/courses/:courseId/progress` - Update progress

### Careers
- `GET /api/careers` - Get all career paths
- `GET /api/careers/:id` - Get career details
- `GET /api/careers/:id/recommendations` - Get recommendations

### Resumes
- `GET /api/resumes` - Get user resumes
- `POST /api/resumes` - Upload resume
- `POST /api/resumes/:id/optimize` - Optimize resume
- `POST /api/resumes/parse` - Parse resume file

## Environment Variables

See `.env.example` for all required variables:
- Database connection details
- Redis configuration
- JWT settings
- API keys for integrations
- File upload limits
- SMTP configuration

## Features

1. **User Management** - Registration, login, profile management
2. **Skill Assessments** - Multiple assessments to evaluate user skills
3. **Job Matching** - Personalized job recommendations based on skills
4. **Learning Paths** - Structured learning paths for skill development
5. **Career Exploration** - Browse and explore different career paths
6. **Resume Optimization** - Upload and optimize resumes with AI insights
7. **Progress Tracking** - Track assessment results and learning progress

## Security

- JWT-based authentication with RS256 algorithm
- Password hashing with bcryptjs (12 rounds)
- Helmet for HTTP security headers
- Rate limiting to prevent API abuse
- CORS configuration for cross-origin requests
- Environment variables for sensitive data

## Development

### Running Tests
```bash
npm test
```

### Code Style
```bash
npm run lint
```

## Deployment

1. Ensure all environment variables are configured
2. Run database migrations (when implemented)
3. Start the server: `npm start`
4. Verify health endpoint: `GET /health`

## API Documentation

Detailed API documentation available at `/api/docs` (Swagger UI - to be implemented)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License

## Support

For issues and questions, please create an issue in the project repository.
