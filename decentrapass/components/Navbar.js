import React, { useEffect } from "react";
import styled from "styled-components";
import Colors from "../library/Colors";
import Link from "next/link";
import { useRouter } from "next/router";
import FancyButton from "./FancyButton";
import {
  useAddress,
} from "@thirdweb-dev/react";

/**************************************************************************
  File: Navbar.js
  Author: Matthew Kelleher
  Description: Nav bar component
**************************************************************************/

// Nav Bar Component
const Navbar = () => {
  const router = useRouter();
  const userAddress = useAddress();

  // Run when sign out button clicked
  function SignOut() {
    location.reload();
    router.push("/loading");
  }

  useEffect(()=>{
    if(!userAddress){
      router.push("/");
    }
  }, [userAddress])

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
          <FancyButton active={router.pathname === "/vault"}>
            Password Vault
          </FancyButton>
        </Link>
        <Link href="/notes">
          <FancyButton active={router.pathname === "/notes"}>
            Note Vault
          </FancyButton>
        </Link>
        <Link href="/settings">
          <FancyButton active={router.pathname === "/settings"}>
            Settings
          </FancyButton>
        </Link>
      </NavButtonContainer>

      {/* Sign Out Button */}
      <SignOutButtonContainer>
        {/* Display User Address */}
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
  background: linear-gradient(180deg, ${Colors.backgroundDark} 0%, black 100%);
  border-right: 1vw black solid;
  position: fixed;
  height: 100%;
  overflow: auto;
  gap: 1vw;
`;

const LogoContainer = styled.div`
  align-self: center;
  padding-bottom: 0.5vw;
`;

const Logo = styled.img`
  width: 12vw;
`;

const NavButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5vw;
`;

const SignOutButtonContainer = styled.div`
  margin-top: auto;
  margin-bottom: 2.5vw;
  gap: 2vw;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export default Navbar;
