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
import DecentraPassABI from "@/contracts/abi/DecentraPassABI";
import { CONTRACT_ADDRESS } from "@/global-values";
import { ethers } from "ethers";

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
    //Sample data
    // const data = [
    //   {
    //     id: 1,
    //     site: "Google",
    //     url: "https://google.com",
    //     username: "test",
    //     password: "test",
    //   },
    //   {
    //     id: 2,
    //     site: "ChatGPT",
    //     url: "https://chat.openai.com",
    //     username: "test",
    //     password: "test",
    //   },
    //   {
    //     id: 3,
    //     site: "GitHub",
    //     url: "https://github.com/",
    //     username: "test",
    //     password: "test",
    //   },
    // ];
    const asyncFunc = async () => {
      if (!signer) {
        return;
      }
      if (!userAddress) {
        return;
      }
      const passwordList = [];
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        DecentraPassABI,
        signer
      );
      try {
        const passwordURIs = await contract.getAllPasswordURI();
        const dataPromises = passwordURIs.map(async (uri) => {
          const data = await storage.download(uri);
          const metadataResponse = await fetch(data.url);
          const metadata = await metadataResponse.json();
          passwordList.push(metadata);
          return metadata;
        });
        const results = await Promise.all(dataPromises);
      } catch (err) {}
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
  margin-left: 2vw;
`;
