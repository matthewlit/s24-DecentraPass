import React from "react";
import styled from "styled-components";
import Colors from "../library/Colors";
import { useState, useEffect } from "react";
import FancyButton from "./FancyButton";
import Card from "./Card";
// Contract
import { useAddress, useStorage, useSigner } from "@thirdweb-dev/react";
import DecentraPassABI from "@/contracts/abi/DecentraPassABI";
import { CONTRACT_ADDRESS } from "@/global-values";
import { ethers } from "ethers";
const crypto = require("crypto");

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
  const [editedUsername, setEditedUsername] = useState("");
  const [editedPassword, setEditedPassword] = useState("");

  const storage = useStorage();
  const userAddress = useAddress();
  const signer = useSigner();

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
  async function removeFromPasswords(item) {
    // Close popup and remove from list
    const index = items.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      // Remove from data
      const asyncFunc = async () => {
        if (!signer) {
          return;
        }
        if (!userAddress) {
          return;
        }
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          DecentraPassABI,
          signer
        );
        const tx = await contract.deletePasswordURI(item.id);
        await tx.wait();
      };
      asyncFunc();
    }
    setSelectedItem(null);

    const newData = [...items];
    newData.splice(index, 1);
    setItems(newData);
  }

  // Change pop up to edit mode
  const edit = (item) => {
    setEditMode(true);
    setEditedSite(item.site);
    setEditedURL(item.url);
    setEditedUsername(item.username);
    setEditedPassword(item.password);
  };

  // Save edit to data
  async function saveEdit() {
    const updatedItem = {
      ...selectedItem,
      site: editedSite !== "" ? editedSite : selectedItem.site,
      url: editedURL !== "" ? editedURL : selectedItem.url,
      username: editedUsername !== "" ? editedUsername : selectedItem.username,
      password: editedPassword !== "" ? editedPassword : selectedItem.password,
    };
    const index = items.findIndex((i) => i.id === selectedItem.id);
    if (index !== -1) {
      // Update data
      const asyncFunc = async () => {
        if (!signer) {
          return;
        }
        if (!userAddress) {
          return;
        }
        const url = await storage.upload(updatedItem);
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          DecentraPassABI,
          signer
        );
        const tx = await contract.updatePasswordURI(selectedItem.id, url);
        await tx.wait();

        const updatedItems = [...items];
        updatedItems[index] = updatedItem;
        setItems(updatedItems);
      };
      asyncFunc();
    }
    setEditMode(false);
    setSelectedItem(updatedItem);
  }

  // Cancel edit adn return to view mode
  const cancelEdit = () => {
    setEditMode(false);
  };

  // Add to password to data
  async function addNewPassword() {
    // Create a new password object with default values
    try {
      const newPassword = {
        id: -1,
        site: editedSite !== "" ? editedSite : "New Site",
        url: editedURL !== "" ? editedURL : "http://example.com",
        username: editedUsername !== "" ? editedUsername : "New Username",
        password: editedPassword !== "" ? editedPassword : "New Password",
      };

      // Add item to data
      const data = JSON.stringify(newPassword) + new Date().toISOString();
      const hash = crypto.createHash("sha256").update(data).digest("hex");
      newPassword.id = hash;
      console.log(newPassword);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        DecentraPassABI,
        signer
      );
      const url = await storage.upload(newPassword);
      const tx = await contract.storePasswordURI(hash, url);
      await tx.wait();

      // Update the items array with the new password
      setItems([...items, newPassword]);
      setSelectedItem(newPassword);
    } catch (err) {
      console.log(err);
    }

    // Set edit mode to true to allow editing of the newly added password
    setEditMode(true);
    setEditedSite("");
    setEditedURL("");
    setEditedUsername("");
    setEditedPassword("");
  }

  // Render on data change
  useEffect(() => {
    setItems(data);
  }, [data]);

  return (
    <>
      {/* Password list */}
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
                {/* Edit mode */}
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
                      type="text"
                      placeholder={selectedItem.username}
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
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
                    {/* View mode */}
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
                      <Title>Username:</Title>
                      <Text>{selectedItem.username}</Text>
                    </InfoWrapper>
                    <InfoWrapper>
                      <Title>Password: </Title>
                      <Text>
                        {/* Show and hide password */}
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
    45deg,
    ${Colors.tertiary} 50%,
    ${Colors.secondary} 100%
  );
  box-shadow: 0 0 0.3vw ${Colors.primary};
  border-radius: 2vw;
  width: 100%;
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
