import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";
import Link from "next/link";
import { useRouter } from "next/router";
import FancyButton from "./FancyButton";
import ImageBackground from "./ImageBackground";

/**************************************************************************
  File: Navbar.js
  Author: Matthew Kelleher
  Description: Nav bar component
**************************************************************************/

// Nav Bar Component
const Navbar = () => {
  const router = useRouter();

  // Run when sign out button clicked
  function SignOut() {
    router.push("/");
  }

  return (
    <Container>
      {/* Logo */}
      <LogoContainer>
        <Link href="/vault">
          <Logo src="Logo_With_Name.png"></Logo>
        </Link>
      </LogoContainer>

      {/* Navigation Buttons */}
      <NavButtonContainer>
        <Link href="/vault">
          <FancyButton active={router.pathname === "/vault"}>Password Vault</FancyButton>
        </Link>
        <Link href="/settings">
          <FancyButton active={router.pathname === "/settings"}>Settings</FancyButton>
        </Link>
      </NavButtonContainer>

      {/* Sign Out Button */}
      <SignOutButtonContainer>
        <FancyButton onClick={SignOut} active={false}>
          Sign Out
        </FancyButton>
      </SignOutButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 14.75%;
  display: flex;
  flex-direction: column;
  padding: 1vw;
  background: linear-gradient(
    0deg,
    ${Colors.backgroundLight} 33%,
    ${Colors.primary} 100%
  );
  border-right: 1vw ${Colors.secondary} solid;
  position: fixed;
  height: 100%;
  overflow: auto;
`;

const LogoContainer = styled.div`
  align-self: center;
  padding-bottom: 0.5vw;
`;

const Logo = styled.img`
  width: 13vw;
`;

const NavButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignOutButtonContainer = styled.div`
  margin-top: auto;
  margin-bottom: 2.5vw;
`;

export default Navbar;
