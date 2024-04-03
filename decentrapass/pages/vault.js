import Head from "next/head";
// Components
import styled from "styled-components";
import Card from "@/components/Card";
import FancyButton from "@/components/FancyButton";
import Colors from "@/library/Colors";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";

/**************************************************************************
  File: vault.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the password vault page
**************************************************************************/

export default function Vault() {

  return (
    <>
      <Head>
        <title>DecentraPass - Vault</title>
        <meta name="description" content="DeventraPass password vault page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Page>
        <Navbar/>
        <Background>
            
        </Background>
      </Page>
    </>
  );
}

// Styled components

const Page = styled.div`
  
`;