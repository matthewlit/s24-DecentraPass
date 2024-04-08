import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";
import { useRef } from "react";
import FancyButton from "./FancyButton";

/**************************************************************************
  File: SearchBar.js
  Author: Matthew Kelleher
  Description: Search Bar component
**************************************************************************/

const SearchBar = ({onSearch }) => {
  // Ref to search bar contents
  const serachRef = useRef(null);

  // Run when search button is clicked
  function Search() {
    const query = serachRef.current.value;
    onSearch(query);
  }

  return (
    <Container>
      <SearchInput ref={serachRef} type="text" placeholder="Search..."/>
      <FancyButton onClick={Search} size="small" active="true">Search</FancyButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1vw;
  gap: 1vw;
`;

const SearchInput = styled.input`
  padding: 0.5vw;
  font-size: 1vw;
  border-radius: 0.5vw;
  border: none;
  width: 42.5%;
  &:active {
    transform: scale(0.99);
  }
`;

export default SearchBar;
