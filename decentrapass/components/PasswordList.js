import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";
import { useState, useEffect } from "react";
import FancyButton from "./FancyButton";
import Card from "./Card";

/**************************************************************************
  File: PasswordList.js
  Author: Matthew Kelleher
  Description:  List given array of passwords with a pop up to edit
**************************************************************************/

// Display list passwords
const PasswordList = ({ data, emptyMessage = "No Saved Passwords" }) => {
  // Initialize useState hooks
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedSite, setEditedSite] = useState("");
  const [editedURL, setEditedURL] = useState("");
  const [editedPassword, setEditedPassword] = useState("");

  // Open popup when more info is clicked
  const openPopup = (item) => {
    setSelectedItem(null);
    setEditMode(false);
    setSelectedItem(item);
  };

  // Close popup when more info is clicked
  const closePopup = () => {
    setSelectedItem(null);
  };

  // Removes selected item from password list
  const removeFromPasswords = (item) => {
    // Close popup and remove from list
    setSelectedItem(null);
    const index = items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      const newData = [...items];
      newData.splice(index, 1);
      setItems(newData);
    }
  };

  const edit = (item) => {
    setEditMode(true);
    setEditedSite(item.site);
    setEditedURL(item.url);
    setEditedPassword(item.password);
  };

  const saveEdit = () => {
    const updatedItem = {
      ...selectedItem,
      site: editedSite !== "" ? editedSite : selectedItem.site,
      url: editedURL !== "" ? editedURL : selectedItem.url,
      password: editedPassword !== "" ? editedPassword : selectedItem.password,
    };
    const index = items.findIndex((i) => i.id === selectedItem.id);
    if (index !== -1) {
      const updatedItems = [...items];
      updatedItems[index] = updatedItem;
      setItems(updatedItems);
    }
    setEditMode(false);
    setSelectedItem(updatedItem);
  };

  const cancelEdit = () => {
    setEditMode(false);
  };

  const addNewPassword = () => {
    const newId = Date.now().toString();

    // Create a new password object with default values
    const newPassword = {
      id: newId,
      site: editedSite !== "" ? editedSite : "New Site",
      url: editedURL !== "" ? editedURL : "http://example.com",
      password: editedPassword !== "" ? editedPassword : "New Password",
    };

    // Update the items array with the new password
    setItems([...items, newPassword]);
    setSelectedItem(newPassword);

    // Set edit mode to true to allow editing of the newly added password
    setEditMode(true);
    setEditedSite("");
    setEditedURL("");
    setEditedPassword("");
  };

  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <>
      <Container>
        <OptionWrapper>
          <FancyButton onClick={addNewPassword} size="big">
            Add New Password
          </FancyButton>
        </OptionWrapper>
        {/* Display list of items */}
        {items.length === 0 ? (
          <NoItem>{emptyMessage}</NoItem>
        ) : (
          items.map((item) => (
            <Item key={item.id} onClick={() => openPopup(item)}>
              <LogoWrapper>
                <SmallLogo
                  src={`https://www.google.com/s2/favicons?domain=${item.url}&sz=128`}
                ></SmallLogo>
              </LogoWrapper>
              <TitleWrapper>
                <Title>{item.site}</Title>
                <ClickableText href={item.url} target="_blank">
                  {item.url}
                </ClickableText>
              </TitleWrapper>
              <ButtonWrapper>
                <FancyButton onClick={() => openPopup(item)} size="small">
                  View
                </FancyButton>
              </ButtonWrapper>
            </Item>
          ))
        )}
      </Container>
      <Container>
        {/* Display popup for selected item */}
        {selectedItem && (
          <Popup>
            <Card>
              <PopupWrapper>
                <LogoWrapper>
                  <BigLogo
                    src={`https://www.google.com/s2/favicons?domain=${selectedItem.url}&sz=128`}
                  ></BigLogo>
                </LogoWrapper>
                {editMode ? (
                  <>
                    <Input
                      type="text"
                      placeholder={selectedItem.site}
                      value={editedSite}
                      onChange={(e) => setEditedSite(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder={selectedItem.url}
                      value={editedURL}
                      onChange={(e) => setEditedURL(e.target.value)}
                    />
                    <Input
                      type={"password"}
                      placeholder="*******"
                      value={editedPassword}
                      onChange={(e) => setEditedPassword(e.target.value)}
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
                    <InfoWrapper>
                      <Title>WebSite:</Title>
                      <Text>{selectedItem.site}</Text>
                    </InfoWrapper>
                    <InfoWrapper>
                      <Title>URL: </Title>
                      <ClickableText href={selectedItem.url} target="_blank">
                        {selectedItem.url}
                      </ClickableText>
                    </InfoWrapper>
                    <InfoWrapper>
                      <Title>Password: </Title>
                      <Text>
                        {showPassword ? selectedItem.password : `*******`}
                        <ToggleButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <img src="show.png" />
                          ) : (
                            <img src="hide.png" />
                          )}
                        </ToggleButton>
                      </Text>
                    </InfoWrapper>
                    <OptionWrapper>
                      <FancyButton
                        onClick={() => edit(selectedItem)}
                        size="small"
                      >
                        Edit
                      </FancyButton>
                      <FancyButton
                        onClick={() => removeFromPasswords(selectedItem)}
                        size="small"
                      >
                        Remove
                      </FancyButton>
                    </OptionWrapper>
                    <FancyButton onClick={closePopup} size="small">
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
  display: flex;
  flex-direction: row;
  background: linear-gradient(
    90deg,
    ${Colors.tertiary} 50%,
    ${Colors.secondary} 100%
  );
  border-radius: 2vw;
  width: 100%;
  &:hover {
    transform: scale(1.05);
    background: linear-gradient(
      90deg,
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
  &:hover {
    transform: scale(1.015);
  }
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
  margin-top: 1vw;
  margin-bottom: 1vw;
  width: 55%;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 1vw;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1vw;
`;

const Text = styled.p`
  font-size: 0.75vw;
`;

const SmallLogo = styled.img`
  width: 3vw;
  height: auto;
  border-radius: 10vw;
  background-color: ${Colors.secondary};
  box-shadow: 0px 0px 10px ${Colors.secondary};
`;

const BigLogo = styled.img`
  width: 6vw;
  height: auto;
  border-radius: 2vw;
  background-color: ${Colors.secondary};
  box-shadow: 0px 0px 10px ${Colors.secondary};
`;

const ClickableText = styled.a`
  font-size: 0.75vw;
  color: ${Colors.text};
  cursor: pointer;
  &:hover {
    background-position: right center;
    transform: scale(1.025);
    &:active {
      transform: scale(0.975);
    }
  }
`;

const ToggleButton = styled.button`
  width: 1.5vw;
  height: 1.5vw;
  background: linear-gradient(0deg, ${Colors.secondary} 50%, white 100%);
  border: none;
  border-radius: 1vw;
  margin-left: 1vw;
  cursor: pointer;
  text-align: center;
  line-height: 1.5vw;

  img {
    width: 1vw;
    height: 1vw;
    vertical-align: middle;
  }

  &:hover {
    transform: scale(1.1);
    &:active {
      transform: scale(0.9);
    }
  }
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

export default PasswordList;
