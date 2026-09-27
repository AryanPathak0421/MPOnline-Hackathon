# CareerBoost Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 16+ and npm
- PostgreSQL 12+
- Redis (optional for initial setup)

---

## Backend Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```

Edit `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=careerboost
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=your-secret-key
```

### 3. Start Server
```bash
npm start          # Production
npm run dev        # Development with auto-reload
```

✅ Backend running on `http://localhost:5000`

**Health Check:**
```bash
curl http://localhost:5000/health
```

---

## Frontend Setup

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm start
```

✅ Frontend running on `http://localhost:3000`

---

## Testing the Application

### 1. Register a New User
- Go to `http://localhost:3000/register`
- Fill in: First Name, Last Name, Email, Password
- Click Register

### 2. Login
- Go to `http://localhost:3000/login`
- Use your registered email and password
- You'll be redirected to the Dashboard

### 3. Explore Features
- **Dashboard:** View your progress and stats
- **Assessments:** Take skill assessments
- **Learning:** Browse learning paths
- **Jobs:** See job recommendations
- **Careers:** Explore career paths
- **Resume:** Upload and optimize resumes
- **Profile:** Manage your profile and skills

---

## API Testing

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Assessments:**
```bash
curl http://localhost:5000/api/assessments \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman
1. Import the API endpoints from backend routes
2. Add `Authorization: Bearer <token>` header for protected endpoints
3. Test each endpoint

---

## Project Structure Quick Reference

```
backend/
├── server.js              # Main entry point
├── config/database.js     # Database setup
├── middleware/auth.js     # Authentication
└── routes/                # API endpoints
    ├── auth.js           # /api/auth/*
    ├── users.js          # /api/users/*
    ├── assessments.js    # /api/assessments/*
    ├── jobs.js           # /api/jobs/*
    ├── learning.js       # /api/learning/*
    ├── careers.js        # /api/careers/*
    └── resumes.js        # /api/resumes/*

frontend/
├── src/
│   ├── pages/            # Page components
│   ├── components/       # Reusable components
│   ├── services/api.js   # API client
│   ├── store/authStore.js# State management
│   └── App.js            # Root component
```

---

## Common Commands

### Backend
```bash
npm start              # Start production server
npm run dev           # Start with auto-reload
npm test             # Run tests
npm run lint         # Linting
```

### Frontend
```bash
npm start             # Start dev server
npm run build         # Build for production
npm test             # Run tests
npm run eject        # Eject from Create React App (irreversible)
```

---

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify .env file exists and has correct credentials
- Check port 5000 is not in use

### Frontend won't connect to backend
- Verify backend is running on port 5000
- Check CORS is enabled in backend
- Check API URL in frontend/src/services/api.js

### Login not working
- Verify user was registered
- Check JWT_SECRET in .env
- Check database has user table

### Database connection errors
- Verify PostgreSQL is running
- Check credentials in .env
- Try creating database: `createdb careerboost`

---

## Environment Variables Quick Setup

### Backend .env
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=careerboost
DB_USER=postgres
DB_PASSWORD=postgres
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=change-this-to-random-string
JWT_EXPIRE=1h
JWT_REFRESH_EXPIRE=30d
PORT=5000
NODE_ENV=development
```

### Frontend .env (optional)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Key Features to Test

### Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] Token persists on refresh
- [ ] Protected routes redirect to login

### Dashboard
- [ ] Load user stats
- [ ] Display progress
- [ ] Show recent activity

### Assessments
- [ ] View assessment list
- [ ] Start assessment
- [ ] Submit answers

### Jobs
- [ ] View job recommendations
- [ ] Apply for job
- [ ] View applications

### Learning
- [ ] View learning paths
- [ ] Track progress
- [ ] Update course progress

### Profile
- [ ] Edit profile
- [ ] Add skills
- [ ] View skills

### Resume
- [ ] Upload resume
- [ ] Get optimization suggestions
- [ ] Download resume

---

## Next Steps

1. **Setup Database Models** - Define schemas for all entities
2. **Implement Controllers** - Add business logic
3. **Add Testing** - Unit and integration tests
4. **Error Handling** - Comprehensive error messages
5. **Deployment** - Deploy to production server

---

## Useful Links

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Styled Components](https://styled-components.com/)
- [Axios Docs](https://axios-http.com/)

---

## Support

For issues:
1. Check QUICKSTART.md (this file)
2. Check README.md files in backend/frontend
3. Check your .env configuration
4. Check console for error messages

---

**Happy Coding! 🎉**
