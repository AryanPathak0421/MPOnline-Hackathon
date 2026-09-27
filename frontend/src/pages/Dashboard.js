import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { api } from '../services/api';
import styled from 'styled-components';
import { FiTarget, FiBook, FiBriefcase, FiTrendingUp } from 'react-icons/fi';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Welcome = styled.h1`
  margin-bottom: 2rem;
  color: #333;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  color: #667eea;
`;

const StatContent = styled.div`
  flex: 1;
`;

const StatLabel = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.h2`
  color: #333;
  margin: 0;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  margin-top: 2rem;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
`;

const RecentActivity = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ActivityItem = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityText = styled.p`
  color: #333;
  margin: 0.5rem 0;
`;

const LoadingText = styled.p`
  color: #666;
  text-align: center;
  padding: 2rem;
`;

const Dashboard = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    assessmentCount: 0,
    completedCourses: 0,
    jobApplications: 0,
    skillsCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const skillsRes = await api.userAPI.getSkills();
        const assessmentRes = await api.userAPI.getAssessmentHistory();
        const applicationsRes = await api.jobAPI.getApplications();

        setStats({
          assessmentCount: assessmentRes.data?.length || 0,
          completedCourses: 3, // Placeholder
          jobApplications: applicationsRes.data?.length || 0,
          skillsCount: skillsRes.data?.length || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <Container>
      <Welcome>Welcome back, {user?.firstName}! 👋</Welcome>

      <StatsGrid>
        <StatCard>
          <StatIcon><FiTarget /></StatIcon>
          <StatContent>
            <StatLabel>Assessments Completed</StatLabel>
            <StatValue>{stats.assessmentCount}</StatValue>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon><FiBook /></StatIcon>
          <StatContent>
            <StatLabel>Courses Completed</StatLabel>
            <StatValue>{stats.completedCourses}</StatValue>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon><FiBriefcase /></StatIcon>
          <StatContent>
            <StatLabel>Job Applications</StatLabel>
            <StatValue>{stats.jobApplications}</StatValue>
          </StatContent>
        </StatCard>

        <StatCard>
          <StatIcon><FiTrendingUp /></StatIcon>
          <StatContent>
            <StatLabel>Skills Developed</StatLabel>
            <StatValue>{stats.skillsCount}</StatValue>
          </StatContent>
        </StatCard>
      </StatsGrid>

      <SectionTitle>Your Progress</SectionTitle>
      {loading ? (
        <LoadingText>Loading your progress...</LoadingText>
      ) : (
        <RecentActivity>
          <ActivityItem>
            <ActivityText>📚 You've completed 3 out of 5 courses in your learning path</ActivityText>
          </ActivityItem>
          <ActivityItem>
            <ActivityText>✅ Assessment: JavaScript Fundamentals - Score: 85/100</ActivityText>
          </ActivityItem>
          <ActivityItem>
            <ActivityText>💼 Applied to 2 new job positions this week</ActivityText>
          </ActivityItem>
          <ActivityItem>
            <ActivityText>🎯 Updated your resume with new skills and experience</ActivityText>
          </ActivityItem>
          <ActivityItem>
            <ActivityText>📈 Your career readiness score improved by 12%</ActivityText>
          </ActivityItem>
        </RecentActivity>
      )}
    </Container>
  );
};

export default Dashboard;
