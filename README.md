# CareerBoost - AI-Powered Career Readiness & Employability Platform

A comprehensive full-stack application designed to help individuals achieve career readiness and improve their employability through skill assessments, personalized job matching, learning paths, resume optimization, and career exploration.

## Project Overview

CareerBoost addresses the growing need for career readiness and employability solutions by providing:

- **Skill Assessments** - Evaluate technical and professional competencies
- **Job Matching** - Personalized job recommendations based on skills
- **Learning Paths** - Structured educational pathways for skill development
- **Career Exploration** - Discover various career paths and opportunities
- **Resume Optimization** - AI-powered resume improvement suggestions
- **Progress Tracking** - Monitor your career development journey

## Technology Stack

### Backend
- **Framework:** Node.js with Express.js
- **Database:** PostgreSQL
- **Caching:** Redis
- **Authentication:** JWT with RS256
- **Security:** Helmet, bcryptjs, Rate Limiting

### Frontend
- **Framework:** React 18
- **Routing:** React Router v6
- **State Management:** Zustand
- **Styling:** Styled Components
- **HTTP Client:** Axios
- **Charts:** Recharts

## Project Structure

```
Mp-Online-Hackathon/
├── backend/
│   ├── config/              # Database configuration
│   ├── middleware/          # Authentication & error handling
│   ├── routes/              # API endpoints
│   ├── server.js            # Main server
│   ├── package.json         # Dependencies
│   ├── .env.example         # Environment template
│   └── README.md            # Backend documentation
│
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── pages/           # Route pages (9 pages)
│   │   ├── components/      # Reusable components
│   │   ├── services/        # API integration
│   │   ├── store/           # State management
│   │   └── App.js           # Root component
│   ├── package.json         # Dependencies
│   └── README.md            # Frontend documentation
│
└── README.md                # This file
```

## Getting Started

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file with database credentials
npm start
```

**Backend runs on:** `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

**Frontend runs on:** `http://localhost:3000`

## Features Implemented

### Authentication & Authorization
- ✅ User registration with validation
- ✅ Secure login with JWT tokens
- ✅ Protected routes
- ✅ Token persistence
- ✅ Session management

### Backend API (7 Route Modules)
- ✅ Auth Routes - Registration, login, verification
- ✅ User Routes - Profile, skills, assessment history
- ✅ Assessment Routes - Get assessments, start, submit
- ✅ Job Routes - Listing, recommendations, applications
- ✅ Learning Routes - Paths, courses, progress
- ✅ Career Routes - Paths, details, recommendations
- ✅ Resume Routes - Upload, optimization, parsing

### Frontend Pages (9 Pages)
- ✅ Login Page - User authentication
- ✅ Register Page - New user registration
- ✅ Dashboard - Overview and progress
- ✅ Skill Assessment - Assessment browsing and taking
- ✅ Learning Paths - Learning path management
- ✅ Job Matching - Job recommendations
- ✅ Career Exploration - Career path browsing
- ✅ Resume Builder - Resume upload and optimization
- ✅ Profile Page - User profile management

### Frontend Components
- ✅ Navigation - Top navigation bar
- ✅ Protected Route - Route protection wrapper
- ✅ API Service - Centralized API client
- ✅ Auth Store - Zustand state management

## File Statistics

### Backend Files (16 files)
- 1 Main server
- 1 Database config
- 1 Auth middleware
- 7 Route modules
- 2 Config files (.env.example, .gitignore)
- 2 Documentation

### Frontend Files (31 files)
- 1 Root App component
- 1 Entry point (index.js)
- 9 Page components
- 2 Reusable components
- 1 API service
- 1 Auth store
- 2 Styling files
- 2 Config files
- 1 HTML template
- 1 Public folder
- 2 Documentation

**Total: ~1000+ lines of production code**

## API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/verify
```

### Users
```
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/skills
POST   /api/users/skills
GET    /api/users/assessment-history
```

### Assessments
```
GET    /api/assessments
GET    /api/assessments/:id
POST   /api/assessments/:id/start
POST   /api/assessments/:id/submit
```

### Jobs
```
GET    /api/jobs
GET    /api/jobs/recommendations
POST   /api/jobs/:jobId/apply
GET    /api/jobs/my/applications
```

### Learning
```
GET    /api/learning
POST   /api/learning
GET    /api/learning/:pathId/courses
POST   /api/learning/:pathId/courses/:courseId/progress
```

### Careers
```
GET    /api/careers
GET    /api/careers/:id
GET    /api/careers/:id/recommendations
```

### Resumes
```
GET    /api/resumes
POST   /api/resumes
POST   /api/resumes/:id/optimize
POST   /api/resumes/parse
```

## Environment Variables

Create `.env` files in both backend and frontend directories:

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=careerboost
DB_USER=postgres
DB_PASSWORD=your_password

REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET=your_jwt_secret
JWT_EXPIRE=1h
JWT_REFRESH_EXPIRE=30d

PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Development Workflow

### Running Both Servers
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm start
```

### Testing
```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

## Project Completion Status

**Overall Completion: ~50%**

### Backend Status: ~70% Complete
- ✅ All route definitions
- ✅ Basic middleware and config
- ⏳ Controllers (to be implemented)
- ⏳ Database models and migrations
- ⏳ Validation schemas
- ⏳ Service layer

### Frontend Status: ~50% Complete
- ✅ All page components
- ✅ Core components
- ✅ API service layer
- ✅ Auth store
- ✅ Routing setup
- ⏳ Form handling components
- ⏳ UI components library
- ⏳ Error handling/notifications

## Next Steps

1. **Backend**
   - Implement database models
   - Create database migrations
   - Implement controllers with business logic
   - Add input validation
   - Implement service layer

2. **Frontend**
   - Integrate form handling
   - Add loading states
   - Implement error notifications
   - Add toast/alert system
   - Component testing

3. **Integration**
   - End-to-end testing
   - Error handling refinement
   - Performance optimization
   - API documentation

## Security Considerations

- ✅ JWT authentication with RS256
- ✅ Password hashing (bcryptjs, 12 rounds)
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ HTTP security headers (Helmet)
- ✅ Environment variables for secrets
- ⏳ Input validation and sanitization
- ⏳ SQL injection prevention

## Performance Optimization

- Lazy loading of pages
- State management optimization
- API request batching
- Cache management with Redis
- Database connection pooling

## Documentation

- ✅ Backend README
- ✅ Frontend README
- ✅ API endpoint documentation
- ✅ Environment setup guide
- ⏳ API documentation (Swagger/OpenAPI)
- ⏳ Component documentation
- ⏳ Database schema documentation

## Deployment

### Backend Deployment
1. Set production environment variables
2. Run database migrations
3. Build and deploy to Node.js hosting (Heroku, AWS, DigitalOcean, etc.)

### Frontend Deployment
1. Build: `npm run build`
2. Deploy build folder to static hosting (Vercel, Netlify, AWS S3, etc.)

## Contributing

1. Create a feature branch from main
2. Make your changes
3. Write/update tests
4. Submit a pull request

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or suggestions:
1. Create an issue in the repository
2. Contact the development team

---

**Project Status:** Active Development  
**Last Updated:** September 2026  
**Version:** 1.0.0-beta
