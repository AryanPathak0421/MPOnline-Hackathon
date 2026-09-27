import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import styled from 'styled-components';
import { FiUpload, FiDownload, FiZap, FiCheck } from 'react-icons/fi';

const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1.5rem;
`;

const Section = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
`;

const UploadArea = styled.div`
  border: 2px dashed #667eea;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileList = styled.div`
  margin-top: 1.5rem;
`;

const FileItem = styled.div`
  background: #f0f0f0;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Suggestion = styled.div`
  background: #f0f0f0;
  padding: 1rem;
  border-left: 4px solid #667eea;
  margin: 1rem 0;
  border-radius: 4px;
`;

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 4px;
`;

const ScoreBar = styled.div`
  flex: 1;
  background-color: #e0e0e0;
  height: 12px;
  border-radius: 4px;
  overflow: hidden;
`;

const ScoreFill = styled.div`
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  height: 100%;
  width: ${props => props.percentage}%;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResumeBuild = () => {
  const [resumes, setResumes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await api.resumeAPI.getAll();
        setResumes(response.data || []);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.resumeAPI.create(formData);
      setResumes([...resumes, response.data]);
      alert('Resume uploaded successfully!');
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Failed to upload resume');
    }
  };

  const handleOptimize = async (resumeId) => {
    try {
      const response = await api.resumeAPI.optimize(resumeId);
      setSuggestions(response.data?.suggestions || []);
    } catch (error) {
      console.error('Error optimizing resume:', error);
      alert('Failed to optimize resume');
    }
  };

  return (
    <Container>
      <Title>Resume Builder & Optimizer</Title>

      <Section>
        <SectionTitle>Upload Your Resume</SectionTitle>
        <UploadArea onClick={() => fileInputRef.current?.click()}>
          <FiUpload size={32} style={{ color: '#667eea', marginBottom: '1rem' }} />
          <p>Click to upload or drag and drop your resume (PDF or DOCX)</p>
        </UploadArea>
        <FileInput 
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          onChange={handleFileSelect}
        />
      </Section>

      {resumes.length > 0 && (
        <Section>
          <SectionTitle>Your Resumes</SectionTitle>
          <FileList>
            {resumes.map(resume => (
              <FileItem key={resume.id}>
                <div>
                  <p style={{ fontWeight: 600 }}>{resume.fileName || 'Resume'}</p>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>
                    Uploaded on {new Date(resume.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Button onClick={() => handleOptimize(resume.id)}>
                    <FiZap size={16} /> Optimize
                  </Button>
                  <Button as="a" href={`#download-${resume.id}`}>
                    <FiDownload size={16} /> Download
                  </Button>
                </div>
              </FileItem>
            ))}
          </FileList>
        </Section>
      )}

      {suggestions.length > 0 && (
        <Section>
          <SectionTitle>Optimization Suggestions</SectionTitle>
          <ScoreContainer>
            <span style={{ fontWeight: 600 }}>Resume Score:</span>
            <ScoreBar>
              <ScoreFill percentage={75} />
            </ScoreBar>
            <span style={{ fontWeight: 600 }}>75/100</span>
          </ScoreContainer>
          {suggestions.map((suggestion, idx) => (
            <Suggestion key={idx}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <FiCheck size={16} style={{ color: '#667eea', marginTop: '0.25rem' }} />
                <div>
                  <p style={{ fontWeight: 600 }}>{suggestion}</p>
                </div>
              </div>
            </Suggestion>
          ))}
        </Section>
      )}
    </Container>
  );
};

export default ResumeBuild;
