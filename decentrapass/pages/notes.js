import Head from "next/head";
// Components 
import styled from "styled-components";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import NoteList from "@/components/NoteList";
import SearchBar from "@/components/SearchBar";
import Colors from "@/library/Colors";
// React
import { useState, useEffect } from "react";
// Contract
import { useAddress, useStorage, useSigner } from "@thirdweb-dev/react";
import DecentraPassNotesABI from "@/contracts/abi/DecentraPassNotesABI";
import { NOTES_CONTRACT_ADDRESS } from "@/global-values";
import { ethers } from "ethers";

/**************************************************************************
  File: notes.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the notes vault page
**************************************************************************/

export default function Vault() {
  // Declare useState variables
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const signer = useSigner();
  const storage = useStorage();
  const userAddress = useAddress();

  // Gets user note data
  async function getNotes() {
    const asyncFunc = async () => {
      if (!signer) {
        return;
      }
      if (!userAddress) {
        return;
      }
      const noteList = [];
      const contract = new ethers.Contract(
        NOTES_CONTRACT_ADDRESS,
        DecentraPassNotesABI,
        signer
      );
      try {
        const noteURIs = await contract.getAllNoteURI();
        const dataPromises = noteURIs.map(async (uri) => {
          try{
          const data = await storage.download(uri);
          const metadataResponse = await fetch(data.url);
          const metadata = await metadataResponse.json();
          noteList.push(metadata);
          return metadata;
          } catch(err) {
            console.log(err);
          }
        });
        const results = await Promise.all(dataPromises);
      } catch (err) {
        console.log(err);
      }
      setNotes(noteList);
      setFilteredNotes(noteList);
    };
    asyncFunc();
  }

  // Filters list based on search
  function onSearch(query) {
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  }

  // Get notes on first render
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <Head>
        <title>DecentraPass - Notes</title>
        <meta name="description" content="DeventraPass note vault page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <Page>
        <Navbar />
        <Background>
          <SearchContainer>
          <Title>Note Vault |</Title>
            <SearchBar onSearch={onSearch} />
          </SearchContainer>
          <ListContainer>
            <Card>
              <NoteList data={filteredNotes} />
            </Card>
          </ListContainer>
        </Background>
      </Page>
    </>
  );
}

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