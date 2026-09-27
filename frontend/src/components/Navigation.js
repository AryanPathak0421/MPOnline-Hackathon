import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import styled from 'styled-components';
import { FiLogOut, FiHome, FiTrendingUp, FiBook, FiTarget, FiUser, FiFile, FiBriefcase } from 'react-icons/fi';

const NavContainer = styled.nav`
  background-color: #1a1a1a;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #00d4ff;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #00b8d4;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.25rem 0.5rem;
  }
`;

const LogoutButton = styled.button`
  background-color: #ff4757;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ee3b2e;
  }
`;

const Navigation = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <NavContainer>
      <Logo to="/dashboard">
        <FiTrendingUp size={24} /> CareerBoost
      </Logo>
      <NavLinks>
        <StyledLink to="/dashboard">
          <FiHome size={18} /> Dashboard
        </StyledLink>
        <StyledLink to="/assessments">
          <FiTarget size={18} /> Assessments
        </StyledLink>
        <StyledLink to="/learning">
          <FiBook size={18} /> Learning
        </StyledLink>
        <StyledLink to="/careers">
          <FiTrendingUp size={18} /> Careers
        </StyledLink>
        <StyledLink to="/jobs">
          <FiBriefcase size={18} /> Jobs
        </StyledLink>
        <StyledLink to="/resume">
          <FiFile size={18} /> Resume
        </StyledLink>
        <StyledLink to="/profile">
          <FiUser size={18} /> {user?.firstName || 'Profile'}
        </StyledLink>
        <LogoutButton onClick={handleLogout}>
          <FiLogOut size={18} /> Logout
        </LogoutButton>
      </NavLinks>
    </NavContainer>
  );
};

export default Navigation;
