import Head from "next/head";
// Components
import styled from "styled-components";
import Card from "@/components/Card";
import FancyButton from "@/components/FancyButton";
import Colors from "@/library/Colors";
import ImageBackground from "@/components/ImageBackground";
//React
import { useRouter } from "next/router";

/**************************************************************************
  File: index.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the login page
**************************************************************************/

export default function Home() {

  const router = useRouter();

  function Login() {
    router.push("/loading");
  }

  return (
    <>
      <Head>
        <title>DecentraPass - Login</title>
        <meta name="description" content="DeventraPass sign in page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <ImageBackground>
        {/* Sign In Form */}
        <Card>
          <SignInWrapper>
            <Title>DecentraPass</Title>
            <Logo src="Logo.png"></Logo>
            <SignInLabel>Email:</SignInLabel>
            <SignInInput type="email"/>
            <SignInLabel>Password:</SignInLabel>
            <SignInInput type="password"/>
            <FancyButton type="submit" onClick={Login}>
              Login
            </FancyButton>
          </SignInWrapper>
        </Card>
      </ImageBackground>
    </>
  );
}

// Styled components

const Title = styled.h1`
  font-size: 2.5vw;
  text-align: center;
`

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignInLabel = styled.label`
  font-size: 1.25vw;
  text-align: center;
`;

const SignInInput = styled.input`
  margin: 0.5vw;
  margin-bottom: 1vw;
  padding: 0.5vw;
  width: 12vw;
  font-size: 0.75vw;
  border-radius: 0.5vw;
  border: None;
  transition: 0.25s;
  &:active {
      transform: scale(0.95);
    }
`;

const Logo = styled.img`
  width: 10vw;
  margin: 1vw;
  border-radius: 1.5vw;
  box-shadow: 0px 0px 10px ${Colors.secondary};
`;
