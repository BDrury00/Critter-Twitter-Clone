import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "./GlobalStyles";

const TweetInputBox = ({ onSubmit }) => {
  const [tweetText, setTweetText] = useState("");
  const maxChar = 280;

  const handleChange = (event) => {
    setTweetText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(tweetText);
    setTweetText("");
  };

  const remainingChars = maxChar - tweetText.length;
  const characterCountColor =
    remainingChars < 0
      ? COLORS.error
      : remainingChars < maxChar * 0.2
      ? COLORS.warning
      : "inherit";

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="What's happening?"
          value={tweetText}
          onChange={handleChange}
        />
        <CharacterCount style={{ color: characterCountColor }}>
          {remainingChars}
        </CharacterCount>
        <Button type="submit" disabled={tweetText.length === 0}>
          Meow
        </Button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid lightgray;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  margin-right: 16px;
  padding: 10px;
  border: none;
  font-size: 16px;
  color: black;
  width: 500px;
  height: 200px;
  text-align: left;
  word-wrap: break-word;
`;

const CharacterCount = styled.span`
  margin-right: 16px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${COLORS.primary};
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 25px;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 10px;
  margin-right: 5px;

  &:disabled {
    background-color: lightgray;
    cursor: default;
  }
`;

export default TweetInputBox;
