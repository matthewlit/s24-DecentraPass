import Head from "next/head";
// Components
import styled from "styled-components";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import PasswordList from "@/components/PasswordList";
import SearchBar from "@/components/SearchBar";
// React
import { useState, useEffect } from "react";
// Contract
import { useAddress, useStorage, useSigner } from "@thirdweb-dev/react";
import DecentraPassPasswordsABI from "@/contracts/abi/DecentraPassPasswordsABI";
import { PASSWORDS_CONTRACT_ADDRESS } from "@/global-values";
import { ethers } from "ethers";
import Colors from "@/library/Colors";

/**************************************************************************
  File: vault.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the password vault page
**************************************************************************/

export default function Vault() {
  const [passwords, setPasswords] = useState([]);
  const [filteredPasswords, setFilteredPasswords] = useState([]);
  const signer = useSigner();
  const storage = useStorage();
  const userAddress = useAddress();

  // Function to fetch passwords
  async function getPasswords() {
    const asyncFunc = async () => {
      if (!signer) {
        return;
      }
      if (!userAddress) {
        return;
      }
      const passwordList = [];
      const contract = new ethers.Contract(
        PASSWORDS_CONTRACT_ADDRESS,
        DecentraPassPasswordsABI,
        signer
      );
      try {
        const passwordURIs = await contract.getAllPasswordURI();
        const dataPromises = passwordURIs.map(async (uri) => {
          try{
          const data = await storage.download(uri);
          const metadataResponse = await fetch(data.url);
          const metadata = await metadataResponse.json();
          passwordList.push(metadata);
          return metadata;
          } catch(err) {
            console.log(err);
          }
        });
        const results = await Promise.all(dataPromises);
      } catch (err) {
        console.log(err);
      }
      setPasswords(passwordList);
      setFilteredPasswords(passwordList);
    };
    asyncFunc();
  }

  // Function to handle search
  function onSearch(query) {
    const filtered = passwords.filter((password) =>
      password.site.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPasswords(filtered);
  }

  // Fetch passwords on initial render
  useEffect(() => {
    getPasswords();
  }, [signer, userAddress]);

  return (
    <>
      <Head>
        <title>DecentraPass - Vault</title>
        <meta name="description" content="DeventraPass password vault page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Page>
        <Navbar />
        <Background>
          <SearchContainer>
            <Title>Password Vault |</Title>
            <SearchBar onSearch={onSearch} />
          </SearchContainer>
          <ListContainer>
            <Card>
              <PasswordList data={filteredPasswords} />
            </Card>
          </ListContainer>
        </Background>
      </Page>
    </>
  );
}

// Styled components

const Page = styled.div``;

const ListContainer = styled.div`
  margin: 2vw;
  width: 50%;
`;

const SearchContainer = styled.div`
  display: flex;
  padding: 1vw;
  padding-left: 2.5vw;
  flex-direction: row;
  gap: 1vw;
  background-color: ${Colors.backgroundDark};
  border-bottom: 0.2vw black solid;
`;

const Title = styled.h1`
  font-size: 2vw;
  font-weight: bold;
  color: ${Colors.text};
`
