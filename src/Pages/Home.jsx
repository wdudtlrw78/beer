import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const imageFade = keyframes`
  50% {
    transform: rotate(45deg);
  }

  100% {
    transform: rotate(-45deg);
  }
`;

const Container = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #323d45;
  border-radius: 0.25rem;
  padding: 1rem;

  & img {
    height: 7.5rem;
    margin-bottom: 1rem;
  }

  & p {
    color: #323d45;
    font-size: 0.875rem;
    font-weight: bold;
  }

  &:hover {
    border: 1px solid #66aa74;
    transition: all 0.3s ease-in-out;
    animation: ${imageFade} 2s infinite alternate;

    & p {
      color: #66aa74;
      transition: all 0.3s ease-in-out;
    }
  }
`;

const Home = () => {
  return (
    <Container>
      <Link to="/beerlist">
        <ButtonContainer>
          <img src="https://images.punkapi.com/v2/5.png" alt="logo" />
          <p>Go see beer lists</p>
        </ButtonContainer>
      </Link>
    </Container>
  );
};

export default Home;
