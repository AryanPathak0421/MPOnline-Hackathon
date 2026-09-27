import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import styled from 'styled-components';
import { FiTarget, FiClock, FiCheckCircle } from 'react-icons/fi';

const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
`;

const AssessmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const AssessmentCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const AssessmentTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
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

const SkillAssessment = () => {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await api.assessmentAPI.getAll();
        setAssessments(response.data || []);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, []);

  const handleStartAssessment = async (assessmentId) => {
    try {
      await api.assessmentAPI.start(assessmentId);
      alert('Assessment started! Answer all questions and submit your answers.');
    } catch (error) {
      console.error('Error starting assessment:', error);
      alert('Failed to start assessment');
    }
  };

  return (
    <Container>
      <Title>Skill Assessments</Title>
      
      {loading ? (
        <LoadingText>Loading assessments...</LoadingText>
      ) : (
        <AssessmentGrid>
          {assessments.length > 0 ? (
            assessments.map(assessment => (
              <AssessmentCard key={assessment.id}>
                <AssessmentTitle>{assessment.title}</AssessmentTitle>
                <p>{assessment.description}</p>
                <Info>
                  <FiTarget size={16} /> {assessment.category}
                </Info>
                <Info>
                  <FiClock size={16} /> {assessment.duration} minutes
                </Info>
                <Info>
                  <FiCheckCircle size={16} /> {assessment.questionCount || 10} questions
                </Info>
                <Button onClick={() => handleStartAssessment(assessment.id)}>
                  Start Assessment
                </Button>
              </AssessmentCard>
            ))
          ) : (
            <LoadingText>No assessments available at the moment</LoadingText>
          )}
        </AssessmentGrid>
      )}
    </Container>
  );
};

export default SkillAssessment;
