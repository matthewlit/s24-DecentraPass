import React from "react";
import styled from "styled-components";
import { useRef } from "react";
import FancyButton from "./FancyButton";

/**************************************************************************
  File: SearchBar.js
  Author: Matthew Kelleher
  Description: Search Bar component
**************************************************************************/

const SearchBar = ({ onSearch }) => {
  // Ref to search bar contents
  const serachRef = useRef(null);

  // Run when search button is clicked
  function Search() {
    const query = serachRef.current.value;
    onSearch(query);
  }

  return (
    <Container>
      <SearchInput ref={serachRef} type="text" placeholder="Search..." />
      <FancyButton onClick={Search} size="small" active="true">
        Search
      </FancyButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 1vw;
  width: 80%;
`;

const SearchInput = styled.input`
  padding: 0.5vw;
  font-size: 1vw;
  border-radius: 0.5vw;
  border: none;
  width: 75%;
  &:active {
    transform: scale(0.99);
  }
`;

export default SearchBar;
