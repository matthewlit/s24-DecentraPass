import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import Colors from "../library/Colors";

/**************************************************************************
  File: FancyButton.js
  Author: Matthew Kelleher
  Description: Button Component
**************************************************************************/

const FancyButton = ({ children }) => {
  return <Button>{children}</Button>;
};

const Button1 = styled.button`
  background-color: ${Colors.accentDark};
  width: 15vw;
  height: 2.5vw;
  margin-top: 1vw;
  color: ${Colors.text};
  text-align: center;
  border: none;
  cursor: pointer;
  border-radius: 0.5vw;
  transition: 0.5s;
  &:hover {
    background-color: ${Colors.accentLight};
  }
`;

const Button = styled.button`
  margin-top: 1vw;
  width: 15vw;
  height: 2.5vw;
  color: ${Colors.text};
  font-size: 1.25vw;
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  border-radius: 2vw;
  display: block;
  border: none;
  font-weight: 700;
  box-shadow: 0vw 0vw 14vw -7vw ${Colors.accentLight};
  background-image: linear-gradient(
    45deg,
    ${Colors.accentDark} 0%,
    ${Colors.accentLight} 50%,
    ${Colors.accentLight} 100%
  );
  cursor: pointer;
  &:hover {
    background-position: right center;
    &:active {
      transform: scale(0.90);
    }
  }
`;

export default FancyButton;
