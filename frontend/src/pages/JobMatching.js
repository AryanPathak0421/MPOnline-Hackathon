import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import styled from 'styled-components';
import { FiBriefcase, FiMapPin, FiDollarSign, FiCheckCircle } from 'react-icons/fi';

const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
`;

const JobGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const JobCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  border-left: 4px solid #667eea;

  &:hover {
    transform: translateY(-5px);
  }
`;

const JobTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const Company = styled.p`
  color: #667eea;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  margin: 0.5rem 0;
  font-size: 0.9rem;
`;

const MatchScore = styled.div`
  background: #f0f0f0;
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ScoreBar = styled.div`
  flex: 1;
  background-color: #e0e0e0;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 1rem;
`;

const ScoreFill = styled.div`
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  height: 100%;
  width: ${props => props.percentage}%;
  transition: width 0.3s;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  color: #666;
  padding: 2rem;
`;

const JobMatching = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.jobAPI.getRecommendations();
        setJobs(response.data || []);
      } catch (error) {
        console.error('Error fetching job recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    try {
      await api.jobAPI.apply(jobId);
      setAppliedJobs(prev => new Set([...prev, jobId]));
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('Failed to apply for this job');
    }
  };

  return (
    <Container>
      <Title>Job Recommendations</Title>

      {loading ? (
        <LoadingText>Loading job recommendations...</LoadingText>
      ) : (
        <JobGrid>
          {jobs.length > 0 ? (
            jobs.map(job => (
              <JobCard key={job.id}>
                <JobTitle>{job.title}</JobTitle>
                <Company>{job.company}</Company>
                <Info>
                  <FiMapPin size={16} /> {job.location}
                </Info>
                <Info>
                  <FiBriefcase size={16} /> {job.jobType || 'Full-time'}
                </Info>
                <Info>
                  <FiDollarSign size={16} /> ${job.salary || 'Competitive'}
                </Info>
                <MatchScore>
                  <span>Match Score:</span>
                  <ScoreBar>
                    <ScoreFill percentage={job.matchScore || 75} />
                  </ScoreBar>
                  <span>{job.matchScore || 75}%</span>
                </MatchScore>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                  {job.description?.substring(0, 100)}...
                </p>
                <Button 
                  onClick={() => handleApply(job.id)}
                  disabled={appliedJobs.has(job.id)}
                >
                  {appliedJobs.has(job.id) ? 'Applied' : 'Apply Now'}
                </Button>
              </JobCard>
            ))
          ) : (
            <LoadingText>No job recommendations available</LoadingText>
          )}
        </JobGrid>
      )}
    </Container>
  );
};

export default JobMatching;
