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

/**************************************************************************
  File: vault.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the password vault page
**************************************************************************/

export default function Vault() {
  const [passwords, setPasswords] = useState([]);
  const [filteredPasswords, setFilteredPasswords] = useState([]);

  // Function to fetch passwords
  function getPasswords() {
    //Sample data
    const data = [
      {
        id: 1,
        site: "Google",
        url: "https://google.com",
        username: "test",
        password: "test",
      },
      {
        id: 2,
        site: "ChatGPT",
        url: "https://chat.openai.com",
        username: "test",
        password: "test",
      },
      {
        id: 3,
        site: "GitHub",
        url: "https://github.com/",
        username: "test",
        password: "test",
      },
    ];
    setPasswords(data);
    setFilteredPasswords(data);
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
  }, []);

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
