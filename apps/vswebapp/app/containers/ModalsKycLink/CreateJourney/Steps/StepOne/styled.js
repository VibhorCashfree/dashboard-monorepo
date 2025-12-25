import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
`;

export const CircleContainer = styled.div`
  position: absolute;
  width: 590px;
  height: 590px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgb(105, 48, 202, 0.2) 0%,
    rgba(105, 48, 202, 0.1) 60%,
    white 100%
  );
  animation: ${pulse} 4s infinite;
`;

export const OuterCircle = styled(Circle)`
  width: 550px;
  height: 550px;
`;

export const MiddleCircle = styled(Circle)`
  width: 500px;
  height: 500px;
  animation-delay: 0.5s;
`;

export const InnerCircle = styled(Circle)`
  width: 450px;
  height: 450px;
  animation-delay: 1s;
`;

export const MobilePreviewContainer = styled.div`
  position: relative;
  z-index: 1; /* Ensure it is above the circles */
`;
