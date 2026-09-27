import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import styled from 'styled-components';
import { FiTrendingUp, FiDollarSign, FiBarChart2, FiArrowRight } from 'react-icons/fi';

const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
`;

const CareerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const CareerCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CareerTitle = styled.h3`
  color: #333;
  margin-bottom: 1rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  margin: 0.75rem 0;
  font-size: 0.95rem;
`;

const Description = styled.p`
  color: #666;
  margin: 1rem 0;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const Demand = styled.div`
  background: #f0f0f0;
  padding: 0.75rem;
  border-radius: 4px;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DemandBar = styled.div`
  flex: 1;
  background-color: #e0e0e0;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
`;

const DemandFill = styled.div`
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  height: 100%;
  width: ${props => props.percentage}%;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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

const CareerExploration = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await api.careerAPI.getAll();
        setCareers(response.data || []);
      } catch (error) {
        console.error('Error fetching careers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  return (
    <Container>
      <Title>Career Exploration</Title>

      {loading ? (
        <LoadingText>Loading career paths...</LoadingText>
      ) : (
        <CareerGrid>
          {careers.length > 0 ? (
            careers.map(career => (
              <CareerCard key={career.id}>
                <CareerTitle>{career.title}</CareerTitle>
                <Description>{career.description}</Description>
                <Info>
                  <FiDollarSign size={16} /> 
                  ${career.minSalary?.toLocaleString()} - ${career.maxSalary?.toLocaleString()}
                </Info>
                <Info>
                  <FiTrendingUp size={16} /> 
                  {career.growthRate || '5%'} growth rate
                </Info>
                <Demand>
                  <FiBarChart2 size={16} />
                  <span>Market Demand:</span>
                  <DemandBar>
                    <DemandFill percentage={career.marketDemand || 75} />
                  </DemandBar>
                  <span>{career.marketDemand || 75}%</span>
                </Demand>
                <Button>
                  Explore Path <FiArrowRight size={16} />
                </Button>
              </CareerCard>
            ))
          ) : (
            <LoadingText>No career paths available</LoadingText>
          )}
        </CareerGrid>
      )}
    </Container>
  );
};

export default CareerExploration;
