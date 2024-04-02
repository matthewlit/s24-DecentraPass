import Head from "next/head";
// Components
import styled from "styled-components";
import Card from "@/components/Card";
import FancyButton from "@/components/FancyButton";
import Colors from "@/library/Colors";

/**************************************************************************
  File: index.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the login page
**************************************************************************/

export default function Home() {

  function Login() {

  }

  return (
    <>
      <Head>
        <title>DecentraPass - Login</title>
        <meta name="description" content="DeventraPass sign in page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Page>
        <BackgroundImage/>
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
      </Page>
    </>
  );
}

// Styled components

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: ${Colors.text};
  background: linear-gradient(
    180deg,
    ${Colors.backgroundDark},
    ${Colors.accentDark}
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
  opacity: 20%;
`

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
  padding: 0.5vw;
  font-size: 1vw;
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
`;
