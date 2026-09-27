# CareerBoost Frontend

AI-Powered Career Readiness & Employability Platform Frontend

## Overview

CareerBoost is a comprehensive web application designed to help individuals achieve career readiness and improve their employability. The frontend is built with React 18, providing a modern and responsive user interface for skill assessments, job matching, learning paths, resume optimization, and career exploration.

## Tech Stack

- **Framework:** React 18
- **Routing:** React Router v6
- **State Management:** Zustand
- **HTTP Client:** Axios
- **Styling:** Styled Components
- **Forms:** React Hook Form
- **Charts:** Recharts
- **Icons:** React Icons

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm
- Backend API running on `http://localhost:5000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── pages/          # Page components
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   ├── Dashboard.js
│   │   ├── SkillAssessment.js
│   │   ├── LearningPaths.js
│   │   ├── JobMatching.js
│   │   ├── CareerExploration.js
│   │   ├── ResumeBuild.js
│   │   └── ProfilePage.js
│   ├── components/     # Reusable components
│   │   ├── Navigation.js
│   │   └── ProtectedRoute.js
│   ├── services/       # API service
│   │   └── api.js
│   ├── store/          # Zustand store
│   │   └── authStore.js
│   ├── App.js          # Root component
│   ├── index.js        # Entry point
│   └── index.css       # Global styles
└── package.json
```

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner

## Key Features

### Authentication
- User registration and login
- JWT token management
- Protected routes
- Session persistence

### Dashboard
- Overview of user progress
- Statistics cards
- Recent activity tracking

### Skill Assessments
- Multiple skill-based assessments
- Assessment details and duration
- Score tracking

### Learning Paths
- Browse available learning paths
- Progress tracking
- Course progression
- Estimated duration

### Job Matching
- Personalized job recommendations
- Skill-based filtering
- Match score calculation
- Job applications

### Career Exploration
- Browse career paths
- Salary range information
- Market demand indicators
- Growth rate tracking

### Resume Builder
- Resume upload functionality
- Resume optimization suggestions
- Score-based improvements
- Download capabilities

### Profile Management
- User profile editing
- Skill management
- Experience tracking
- Bio section

## Component Architecture

### Pages
Each page is a full-screen view corresponding to a route.

### Components
Reusable UI components used across pages.

### Services
API integration layer (`api.js`) handles all backend communication.

### Store
Zustand store manages application state, primarily authentication.

## Styling

The application uses styled-components for component-scoped styling with a modern color scheme:
- Primary: #667eea (Purple)
- Secondary: #764ba2 (Dark Purple)
- Accent: #00d4ff (Cyan)

## API Integration

All API calls are centralized in `src/services/api.js`:

```javascript
// Example usage
const response = await api.authAPI.login(email, password);
const jobs = await api.jobAPI.getRecommendations();
```

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Zustand store manages user state
5. Protected routes check authentication
6. Token included in all API requests via interceptor

## Build and Deployment

### Development Build
```bash
npm start
```

### Production Build
```bash
npm run build
```

The build folder is ready to be deployed to any static hosting service.

## Environment Configuration

The API base URL is configured in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

Update this for different environments (staging, production, etc.)

## Performance Considerations

- Code splitting via React Router
- Lazy loading of pages
- Zustand for efficient state management
- Memoization where needed
- Optimized component rendering

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Connection Issues
- Ensure backend is running on `http://localhost:5000`
- Check CORS configuration in backend
- Verify firewall settings

### Authentication Issues
- Clear localStorage and cookies
- Check token expiration
- Verify JWT configuration

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT License

## Support

For issues and questions, please create an issue in the project repository.
