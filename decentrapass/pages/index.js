import Head from "next/head";
// Components
import styled from "styled-components";
import Colors from "@/library/Colors";
import Card from "@/components/Card";
import ImageBackground from "@/components/ImageBackground";
//React
import { useRouter } from "next/router";
import { useEffect } from "react";
//Thirdweb
import { ConnectEmbed, useSigner } from "@thirdweb-dev/react";

/**************************************************************************
  File: index.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the login page
**************************************************************************/

export default function Home() {
  const router = useRouter();
  const signer = useSigner();

  useEffect(() => {
    if (signer) {
      router.push("/loading");
    }
  }, [signer]);

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
            <Logo src="Logo_With_Name.png"></Logo>
            <ConnectEmbed />
          </SignInWrapper>
        </Card>
      </ImageBackground>
    </>
  );
}

// Styled components

const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2vw
`;

const Logo = styled.img`
  height: 15vw;
  border-radius: 2vw;
  box-shadow: 0px 0px 10px ${Colors.secondary};
`;
