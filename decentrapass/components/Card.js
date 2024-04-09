import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import Colors from "../library/Colors";

/**************************************************************************
  File: Card.js
  Author: Matthew Kelleher
  Description: Card for page contents component
**************************************************************************/

const Card = ({ children }) => {
  return (
    <Wrapper>
      <AnimatedBorder />
      <Content>{children}</Content>
    </Wrapper>
  );
};

const BorderAnimation = keyframes`
    0% { transform: rotate(0deg); }
    25% { transform: rotate(90deg); }
    50% { transform: rotate(180deg); }
    75% { transform: rotate(270deg); }
    100% {transform: rotate(360deg);}
`;

const AnimatedBorder = styled.div`
  position: absolute;
  inset: 0;
  height: 100%;
  background: conic-gradient(
    transparent 20deg,
    ${Colors.accentLight},
    50deg,
    transparent 100deg
  );
  filter: blur(1vw);
  border-radius: 1.5vw;
  transform-origin: center;
  animation: ${BorderAnimation} linear 5s infinite;
  will-change: transform;
`;

const Wrapper = styled.div`
  padding: 0.25vw;
  position: relative;
  overflow: hidden;
  background: ${Colors.accentDark};
  border-radius: 1.5vw;
  display: block;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  background: linear-gradient(0deg, ${Colors.backgroundLight} 10%, black 100%);
  border-radius: 1.5vw;
  padding: 2vw;
`;

export default Card;
