import Head from "next/head";
// Components
import styled from "styled-components";
import Colors from "@/library/Colors";
import { keyframes } from "styled-components";
import ImageBackground from "@/components/ImageBackground";
// React
import { useRouter } from "next/router";
import React, { useEffect } from "react";

/**************************************************************************
  File: loading.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the loading page
**************************************************************************/

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/vault");
    }, 3000);
  }, []);

  return (
    <>
      <Head>
        <title>DecentraPass - Loading...</title>
        <meta name="description" content="DeventraPass loading page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <ImageBackground>
        <Ring>
          <Span />
        </Ring>
      </ImageBackground>
    </>
  );
}

// Styled components

const AnimateC = keyframes`
  0% {transform:rotate(0deg);}
  100% {transform:rotate(360deg);}
`;

const Animate = keyframes`
  0% {transform:rotate(45deg);}
  100% {transform:rotate(405deg);}
`;

const Ring = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20vw;
  height: 20vw;
  background-image: url("Logo_With_Name.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 0.5vw solid ${Colors.primary};
  border-radius: 50%;
  box-shadow: 0 0 5vw rgba(0, 0, 0, 0.5);
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-right: 0.25vw solid ${Colors.tertiary};
    border-radius: 50%;
    animation: ${AnimateC} 2s linear infinite;
    top: -4px;
    right: -4px;
  }
`;

const Span = styled.span`
  display: block;
  position: absolute;
  top: calc(50% - 2px);
  left: 50%;
  width: 50%;
  height: 4px;
  transform-origin: left;
  animation: ${Animate} 2s linear infinite;
  &:before {
    content: "";
    position: absolute;
    width: 1.5vw;
    height: 1.5vw;
    border-radius: 50%;
    background: ${Colors.tertiary};
    top: -10px;
    right: -10px;
    box-shadow: 0 0 1vw ${Colors.tertiary};
  }
`;
