import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  verify: () => api.get('/auth/verify')
};

// Assessment endpoints
export const assessmentAPI = {
  getAll: () => api.get('/assessments'),
  getById: (id) => api.get(`/assessments/${id}`),
  start: (id) => api.post(`/assessments/${id}/start`),
  submit: (id, data) => api.post(`/assessments/${id}/submit`, data)
};

// Job endpoints
export const jobAPI = {
  getAll: (params) => api.get('/jobs', { params }),
  getRecommendations: () => api.get('/jobs/recommendations'),
  apply: (jobId) => api.post(`/jobs/${jobId}/apply`),
  getApplications: () => api.get('/jobs/my/applications')
};

// Learning endpoints
export const learningAPI = {
  getPaths: () => api.get('/learning'),
  createPath: (data) => api.post('/learning', data),
  getCourses: (pathId) => api.get(`/learning/${pathId}/courses`),
  updateProgress: (pathId, courseId, progress) => api.post(`/learning/${pathId}/courses/${courseId}/progress`, { progress })
};

// Career endpoints
export const careerAPI = {
  getAll: () => api.get('/careers'),
  getById: (id) => api.get(`/careers/${id}`),
  getRecommendations: (id) => api.get(`/careers/${id}/recommendations`)
};

// User endpoints
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getSkills: () => api.get('/users/skills'),
  addSkill: (data) => api.post('/users/skills', data),
  getAssessmentHistory: () => api.get('/users/assessment-history')
};

// Resume endpoints
export const resumeAPI = {
  getAll: () => api.get('/resumes'),
  create: (formData) => api.post('/resumes', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  optimize: (id) => api.post(`/resumes/${id}/optimize`),
  parse: (formData) => api.post('/resumes/parse', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
};

export default api;
