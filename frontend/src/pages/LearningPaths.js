import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import styled from 'styled-components';
import { FiBook, FiTarget, FiClock, FiCheckCircle } from 'react-icons/fi';

const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
`;

const PathGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const PathCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const PathTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  margin: 0.5rem 0;
  font-size: 0.9rem;
`;

const ProgressBar = styled.div`
  background-color: #e0e0e0;
  height: 8px;
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
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
`;

const LoadingText = styled.p`
  text-align: center;
  color: #666;
  padding: 2rem;
`;

const LearningPaths = () => {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const response = await api.learningAPI.getPaths();
        setPaths(response.data || []);
      } catch (error) {
        console.error('Error fetching learning paths:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaths();
  }, []);

  return (
    <Container>
      <Title>Learning Paths</Title>

      {loading ? (
        <LoadingText>Loading learning paths...</LoadingText>
      ) : (
        <PathGrid>
          {paths.length > 0 ? (
            paths.map(path => (
              <PathCard key={path.id}>
                <PathTitle>{path.title}</PathTitle>
                <p>{path.description}</p>
                <Info>
                  <FiTarget size={16} /> Skills: {path.targetSkills?.length || 0}
                </Info>
                <Info>
                  <FiClock size={16} /> {path.estimatedDuration || 0} hours
                </Info>
                <Info>
                  <FiCheckCircle size={16} /> {path.courseCount || 5} courses
                </Info>
                <ProgressBar>
                  <ProgressFill percentage={path.progress || 0} />
                </ProgressBar>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                  {path.progress || 0}% Complete
                </p>
                <Button>Continue Learning</Button>
              </PathCard>
            ))
          ) : (
            <LoadingText>No learning paths available yet</LoadingText>
          )}
        </PathGrid>
      )}
    </Container>
  );
};

export default LearningPaths;
