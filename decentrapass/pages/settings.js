import Head from "next/head";
// Components
import styled from "styled-components";
import Card from "@/components/Card";
import FancyButton from "@/components/FancyButton";
import Colors from "@/library/Colors";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import { useRouter } from "next/router";
// React
import { useState, useEffect } from "react";
// Contract
import { useAddress, useStorage, useSigner } from "@thirdweb-dev/react";
import DecentraPassPasswordsABI from "@/contracts/abi/DecentraPassPasswordsABI";
import { PASSWORDS_CONTRACT_ADDRESS } from "@/global-values";
import DecentraPassNotesABI from "@/contracts/abi/DecentraPassNotesABI";
import { NOTES_CONTRACT_ADDRESS } from "@/global-values";
import { ethers } from "ethers";

/**************************************************************************
  File: settings.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the settings page
**************************************************************************/

export default function Settings() {
  const router = useRouter();
  const signer = useSigner();
  const storage = useStorage();
  const userAddress = useAddress();

  async function removeAllPasswords() {
    const asyncFunc = async () => {
      if (!signer) {
        return;
      }
      if (!userAddress) {
        return;
      }
      // Get all passwords
      const passwordList = [];
      const contract = new ethers.Contract(
        PASSWORDS_CONTRACT_ADDRESS,
        DecentraPassPasswordsABI,
        signer
      );
      try {
        const passwordURIs = await contract.getAllPasswordURI();
        const dataPromises = passwordURIs.map(async (uri) => {
          try {
            const data = await storage.download(uri);
            const metadataResponse = await fetch(data.url);
            const metadata = await metadataResponse.json();
            passwordList.push(metadata);
            return metadata;
          } catch (err) {
            console.log(err);
          }
        });
        const results = await Promise.all(dataPromises);
      } catch (err) {
        console.log(err);
      }
      // Delete all passwords
      passwordList.map(async (item) => {
        const tx = await contract.deletePasswordURI(item.id);
        await tx.wait();
      });
    };
    asyncFunc();
  }

  async function removeAllNotes() {
    const asyncFunc = async () => {
      if (!signer) {
        return;
      }
      if (!userAddress) {
        return;
      }
      // Get all notes
      const noteList = [];
      const contract = new ethers.Contract(
        NOTES_CONTRACT_ADDRESS,
        DecentraPassNotesABI,
        signer
      );
      try {
        const noteURIs = await contract.getAllNoteURI();
        const dataPromises = noteURIs.map(async (uri) => {
          try {
            const data = await storage.download(uri);
            const metadataResponse = await fetch(data.url);
            const metadata = await metadataResponse.json();
            noteList.push(metadata);
            return metadata;
          } catch (err) {
            console.log(err);
          }
        });
        const results = await Promise.all(dataPromises);
      } catch (err) {
        console.log(err);
      }
      // Delete all notes
      noteList.map(async (note) => {
        const tx = await contract.deleteNoteURI(note.id);
        await tx.wait();
      });
    };
    asyncFunc();
  }

  // Run when switch user button clicked
  function SwitchUser() {
    location.reload();
    router.push("/loading");
  }

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
                  <Label>Current User:</Label>
                  <Info>{userAddress}</Info>
                </ProfileForm>
                <FancyButton onClick={() => SwitchUser()}>
                  Switch User
                </FancyButton>
              </Card>
            </SettingsSection>
            <SettingsSection>
              <Card>
                <SectionTitle>Danger Zone</SectionTitle>
                <ButtonContainer>
                  <FancyButton
                    danger={true}
                    onClick={() => removeAllPasswords()}
                  >
                    Remove All Passwords
                  </FancyButton>
                  <FancyButton danger={true} onClick={() => removeAllNotes()}>
                    Remove All Notes
                  </FancyButton>
                </ButtonContainer>
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
  margin-bottom: 1vw;
`;

const Label = styled.h1`
  font-size: 1.25vw;
  margin-bottom: 0.5vw;
`;

const Info = styled.p``;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1vw;
`;
