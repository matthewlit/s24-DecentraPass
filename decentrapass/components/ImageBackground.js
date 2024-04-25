import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";

/**************************************************************************
  File: ImageBackground.js
  Author: Matthew Kelleher
  Description: Image Background of page div styled component
**************************************************************************/

const ImageBackground = ({ children }) => {
  return (
    <Page>
      <BackgroundImage />
      {children}
    </Page>
  );
};

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${Colors.text};
  background: linear-gradient(
    135deg,
    ${Colors.backgroundDark} 33%,
    ${Colors.accentDark} 100%
  );
`;

const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("background.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 15%;
`;

export default ImageBackground;
