import Head from "next/head";
// Components 
import styled from "styled-components";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Background from "@/components/Background";
import NoteList from "@/components/NoteList";
import SearchBar from "@/components/SearchBar";
// React
import { useState, useEffect } from "react";

/**************************************************************************
  File: notes.js
  Author: Matthew Kelleher
  Description: Handles all components and function for the notes vault page
**************************************************************************/

export default function Vault() {
  // Declare useState variables
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);

  // Gets user note data
  function getNotes() {
    // Sample data
    const data = [
      { id: 1, title: "Note 1", content: "Content of Note 1" },
      { id: 2, title: "Note 2", content: "Content of Note 2" },
      { id: 3, title: "Note 3", content: "Content of Note 3" },
    ];
    setNotes(data);
    setFilteredNotes(data);
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
  margin-left: 2vw;
`;
