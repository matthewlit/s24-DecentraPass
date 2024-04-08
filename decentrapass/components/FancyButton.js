import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";
import Colors from "../library/Colors";

/**************************************************************************
  File: FancyButton.js
  Author: Matthew Kelleher
  Description: Button Component
**************************************************************************/

const FancyButton = ({ children, onClick, active = false, size = "big" }) => {
  return (
    <Button onClick={onClick} active={active} size={size}>
      {children}
    </Button>
  );
};

const Button = styled.button`
  width: ${(props) => (props.size === "small" ? `5vw` : `12vw`)};
  height: 2vw;
  color: ${Colors.text};
  font-size: 1vw;
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  border-radius: 2vw;
  display: block;
  border: none;
  font-weight: 700;
  background-image: ${(props) =>
    props.active
      ? `linear-gradient(
      45deg,
      ${Colors.accentDark},
      ${Colors.accentLight}
    )`
      : `linear-gradient(
      45deg,
      ${Colors.primary} 0%,
      ${Colors.tertiary} 33%,
      ${Colors.accentLight} 66%,
      ${Colors.accentDark} 100%
    )`};
  cursor: pointer;
  &:hover {
    background-position: right center;
    transform: scale(1.1);
    &:active {
      transform: scale(0.9);
    }
  }
`;

export default FancyButton;
