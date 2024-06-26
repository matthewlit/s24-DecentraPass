import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";

/**************************************************************************
  File: Background.js
  Author: Matthew Kelleher
  Description: Background of page div styled component
**************************************************************************/

const Background = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  background: linear-gradient(
    180deg,
    ${Colors.backgroundLight} 25%,
    ${Colors.backgroundDark} 50%,
    black 150%
  );
  margin-left: 17%;
  position: fixed;
  height: 100vh;
  width: 88%;
  overflow: auto;
`;

export default Background;
