import Head from "next/head";
// Components
import styled from "styled-components";
import Card from "@/components/Card";
import FancyButton from "@/components/FancyButton";
import Colors from "@/library/Colors";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";

/**************************************************************************
  File: settings.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the settings page
**************************************************************************/

export default function Settings() {

  return (
    <>
      <Head>
        <title>DecentraPass - Settings</title>
        <meta name="description" content="DeventraPass setttings page" />
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