import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Colors from "../library/Colors";
import FancyButton from "./FancyButton";
import Card from "./Card";

/**************************************************************************
  File: NoteList.js
  Author: Matthew Kelleher
  Description:  List given array of notes with a pop up to edit
**************************************************************************/

const NoteList = ({ data, emptyMessage = "No Saved Notes" }) => {
  // Declare useState variables
  const [selectedNote, setSelectedNote] = useState(null);
  const [notes, setNotes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  // Open note popup
  const openNote = (note) => {
    setSelectedNote(null);
    setEditMode(false);
    setSelectedNote(note);
  };

  // Close not popup
  const closeNote = () => {
    setSelectedNote(null);
  };

  // Remove note from data
  const removeNote = (note) => {
    setSelectedNote(null);
    const index = notes.findIndex((n) => n.id === note.id);
    if (index !== -1) {
      const newNotes = [...notes];
      newNotes.splice(index, 1);
      setNotes(newNotes);
    }
  };

  // Set popup to edit mode
  const editNote = (note) => {
    setEditMode(true);
    setEditedTitle(note.title);
    setEditedContent(note.content);
  };

  // Save edit note
  const saveEdit = () => {
    const updatedNote = {
      ...selectedNote,
      title: editedTitle !== "" ? editedTitle : selectedNote.title,
      content: editedContent !== "" ? editedContent : selectedNote.content,
    };
    const index = notes.findIndex((n) => n.id === selectedNote.id);
    if (index !== -1) {
      const updatedNotes = [...notes];
      updatedNotes[index] = updatedNote;
      setNotes(updatedNotes);
    }
    setEditMode(false);
    setSelectedNote(updatedNote);
  };

  // Cancel edit and return to normal pop up
  const cancelEdit = () => {
    setEditMode(false);
  };

  // Add a new note to data
  const addNewNote = () => {
    const newId = Date.now().toString();
    const newNote = {
      id: newId,
      title: "New Note",
      content: "",
    };
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
    setEditMode(true);
    setEditedTitle("");
    setEditedContent("");
  };

  // Render note list on change
  useEffect(() => {
    setNotes(data);
  }, [data]);

  return (
    <>
      {/* Notes list */}
      <Container>
        <OptionWrapper>
          <FancyButton onClick={addNewNote} size="big">
            Add New Note
          </FancyButton>
        </OptionWrapper>
        {notes.length === 0 ? (
          <NoItem>{emptyMessage}</NoItem>
        ) : (
          <GridContainer>
            {notes.map((note) => (
              <Item key={note.id} onClick={() => openNote(note)}>
                <TitleWrapper>
                  <Title>{note.title}</Title>
                </TitleWrapper>
                <ButtonWrapper>
                  <FancyButton onClick={() => openNote(note)} size="small">
                    View
                  </FancyButton>
                </ButtonWrapper>
              </Item>
            ))}
          </GridContainer>
        )}
      </Container>
      <Container>
        {/* Pop up */}
        {selectedNote && (
          <Popup>
            <Card>
              <PopupWrapper>
                {/* Edit mode */}
                {editMode ? (
                  <>
                    <Input
                      type="text"
                      placeholder="Title"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <Textarea
                      placeholder="Content"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    />
                    <OptionWrapper>
                      <FancyButton onClick={saveEdit} size="small">
                        Save
                      </FancyButton>
                      <FancyButton onClick={cancelEdit} size="small">
                        Cancel
                      </FancyButton>
                    </OptionWrapper>
                  </>
                ) : (
                  <>
                    {/* View mode  */}
                    <InfoWrapper>
                      <Title>Title: {selectedNote.title}</Title>
                    </InfoWrapper>
                    <InfoWrapper>
                      <Title>Content: </Title>
                      <Text>{selectedNote.content}</Text>
                    </InfoWrapper>
                    <OptionWrapper>
                      <FancyButton
                        onClick={() => editNote(selectedNote)}
                        size="small"
                      >
                        Edit
                      </FancyButton>
                      <FancyButton
                        onClick={() => removeNote(selectedNote)}
                        size="small"
                      >
                        Remove
                      </FancyButton>
                    </OptionWrapper>
                    <FancyButton onClick={closeNote} size="small">
                      Close
                    </FancyButton>
                  </>
                )}
              </PopupWrapper>
            </Card>
          </Popup>
        )}
      </Container>
    </>
  );
};

// Styled components

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5vw;
  color: ${Colors.text};
`;

const Item = styled.div`
  width: 10vw;
  background: linear-gradient(
    45deg,
    ${Colors.tertiary} 50%,
    ${Colors.secondary} 100%
  );
  border-radius: 2vw;
  padding: 1vw;
  box-shadow: 0 0 0.3vw ${Colors.primary};
  &:hover {
    transform: scale(1.05);
    background: linear-gradient(
      45deg,
      ${Colors.accentDark} 50%,
      ${Colors.accentLight} 100%
    );
  }
`;

const Title = styled.h3`
  font-size: 1vw;
  font-weight: bold;
  margin-bottom: 0.5vw;
`;

const NoItem = styled.h2`
  display: flex;
  text-align: center;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Popup = styled.div`
  position: fixed;
  top: 0%;
  left: 65%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
  padding: 1vw;
  width: 25vw;
  height: 100%;
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1vw;
  width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  text-align: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 1vw;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1vw;
  align-items: center;
`;

const Text = styled.p`
  font-size: 0.75vw;
  padding: 0.5vw;
  font-size: 1vw;
  border-radius: 0.5vw;
  border: none;
  resize: vertical;
  min-height: 10vw;
  background-color: white;
  color: black;
  text-align: left;
  overflow: auto;
  max-height: 20vw;
  resize: none;
`;

const Input = styled.input`
  margin: 0.5vw;
  margin-bottom: 1vw;
  padding: 0.5vw;
  width: 12vw;
  font-size: 0.75vw;
  border-radius: 0.5vw;
  border: None;
  transition: 0.25s;
  color: black;
  &:active {
    transform: scale(0.95);
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 1vw;
  margin-bottom: 0.5vw;
  justify-content: center;
  gap: 1vw;
`;

const Textarea = styled.textarea`
  padding: 0.5vw;
  font-size: 0.75vw;
  border-radius: 0.5vw;
  border: none;
  resize: none;
  min-height: 10vw;
  max-height: 20vw;
  width: 90%;
  transition: 0.25s;
  &:active {
    transform: scale(0.95);
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10vw, 12.5vw));
  gap: 1vw;
`;
export default NoteList;
