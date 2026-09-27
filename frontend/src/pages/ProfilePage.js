import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { api } from '../services/api';
import styled from 'styled-components';
import { FiEdit2, FiSave, FiX, FiPlus } from 'react-icons/fi';

const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 2rem;
`;

const ProfileSection = styled.div`
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

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }

  ${props => props.primary ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  ` : `
    background: #e0e0e0;
    color: #333;
  `}
`;

const SkillTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  margin: 0.5rem;
`;

const SkillContainer = styled.div`
  margin: 1rem 0;
`;

const LoadingText = styled.p`
  text-align: center;
  color: #666;
  padding: 2rem;
`;

const ProfilePage = () => {
  const { user } = useAuthStore();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bio: user?.bio || '',
  });
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const skillsRes = await api.userAPI.getSkills();
        setSkills(skillsRes.data || []);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      await api.userAPI.updateProfile(profile);
      alert('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;

    try {
      await api.userAPI.addSkill({
        name: newSkill,
        proficiency: 'Intermediate',
        yearsOfExperience: 1,
      });
      setSkills([...skills, { id: Date.now(), name: newSkill, proficiency: 'Intermediate' }]);
      setNewSkill('');
    } catch (error) {
      console.error('Error adding skill:', error);
      alert('Failed to add skill');
    }
  };

  return (
    <Container>
      <Title>My Profile</Title>

      {loading ? (
        <LoadingText>Loading profile...</LoadingText>
      ) : (
        <>
          <ProfileSection>
            <SectionTitle>
              Personal Information
              {!editMode && (
                <Button style={{ float: 'right' }} onClick={() => setEditMode(true)}>
                  <FiEdit2 size={16} /> Edit
                </Button>
              )}
            </SectionTitle>

            {editMode ? (
              <>
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleProfileChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleProfileChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Bio</Label>
                  <Textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleProfileChange}
                    placeholder="Tell us about yourself..."
                  />
                </FormGroup>

                <ButtonGroup>
                  <Button primary onClick={handleSaveProfile}>
                    <FiSave size={16} /> Save Changes
                  </Button>
                  <Button onClick={() => setEditMode(false)}>
                    <FiX size={16} /> Cancel
                  </Button>
                </ButtonGroup>
              </>
            ) : (
              <>
                <FormGroup>
                  <Label>Name</Label>
                  <p style={{ color: '#333', padding: '0.75rem 0' }}>
                    {profile.firstName} {profile.lastName}
                  </p>
                </FormGroup>

                <FormGroup>
                  <Label>Email</Label>
                  <p style={{ color: '#333', padding: '0.75rem 0' }}>
                    {user?.email}
                  </p>
                </FormGroup>

                <FormGroup>
                  <Label>Bio</Label>
                  <p style={{ color: '#666', padding: '0.75rem 0', lineHeight: '1.5' }}>
                    {profile.bio || 'No bio added yet'}
                  </p>
                </FormGroup>
              </>
            )}
          </ProfileSection>

          <ProfileSection>
            <SectionTitle>Skills & Experience</SectionTitle>

            <SkillContainer>
              {skills.map(skill => (
                <SkillTag key={skill.id}>
                  {skill.name}
                  <span style={{ fontSize: '0.85rem', color: '#666' }}>
                    ({skill.proficiency})
                  </span>
                </SkillTag>
              ))}
            </SkillContainer>

            <FormGroup>
              <Label>Add New Skill</Label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g., Python, React, Project Management"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button primary onClick={handleAddSkill}>
                  <FiPlus size={16} /> Add
                </Button>
              </div>
            </FormGroup>
          </ProfileSection>
        </>
      )}
    </Container>
  );
};

export default ProfilePage;
