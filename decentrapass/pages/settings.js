import Head from "next/head";
// Components
import styled from "styled-components";
import Card from "@/components/Card";
import FancyButton from "@/components/FancyButton";
import Colors from "@/library/Colors";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
// React
import { useState } from "react";

/**************************************************************************
  File: settings.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the settings page
**************************************************************************/

export default function Settings() {
  // Declare useState variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Run on profile info change
  const updateProfile = () => {};

  return (
    <>
      <Head>
        <title>DecentraPass - Settings</title>
        <meta name="description" content="DeventraPass setttings page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Page>
        <Navbar />
        <Background>
          <Container>
            <Title>Settings</Title>
            <SettingsSection>
              <Card>
                {/* Profile Settings */}
                <SectionTitle>Profile Settings</SectionTitle>
                <ProfileForm>
                  <InputLabel>Email:</InputLabel>
                  <InputField
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputLabel>Password:</InputLabel>
                  <InputField
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FancyButton onClick={updateProfile}>
                    Save Changes
                  </FancyButton>
                </ProfileForm>
              </Card>
            </SettingsSection>
            <SettingsSection>
              <Card>
                <SectionTitle>Other Settings</SectionTitle>
              </Card>
            </SettingsSection>
          </Container>
        </Background>
      </Page>
    </>
  );
}

// Styled components

const Page = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3vw;
  color: ${Colors.text};
`;

const Title = styled.h2`
  margin-bottom: 3vw;
  margin-right: 5vw;
  text-align: center;
  font-size: 4vw;
  font-weight: bold;
`;

const SettingsSection = styled.div`
  margin-bottom: 3vw;
  width: 95%;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1vw;
  font-size: 2vw;
`;

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputLabel = styled.label`
  font-size: 1.25vw;
  margin-bottom: 0.5vw;
`;

const InputField = styled.input`
  margin-bottom: 1vw;
  padding: 0.5vw;
  width: 20vw;
  font-size: 1vw;
  border-radius: 0.5vw;
  border: none;
  transition: 0.25s;
  &:active {
    transform: scale(0.95);
  }
`;
