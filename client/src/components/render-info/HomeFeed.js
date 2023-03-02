import { useEffect, useState } from "react";
import Tweet from "../../Tweet";
import TweetInputBox from "../../TweetInputBox";
import styled from "styled-components";

const HomeFeed = () => {
  //useStatates
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    //fetch for homefeed
    fetch("/api/me/home-feed")
      .then((response) => response.json())
      .then((data) => {
        const sortedTweets = data.tweetIds.map(
          (tweetId) => data.tweetsById[tweetId]
        );
        setTweets(sortedTweets);
        setIsLoading(false);
        console.log(sortedTweets);
      });
  }, [reload]);

  // Handle submitting the tweet
  const handleTweetSubmit = (status) => {
    const endpoint = "/api/tweet";
    const requestBody = { status };

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // check if my tweet was successfully submitted :)
        console.log("New tweet created:", data);
        setReload(!reload);
      })
      .catch((error) => {
        // I guess it wasn't succesfull :(
        console.error("Error creating tweet:", error);
      });
  };

  return (
    <>
      <TweetInputBox onSubmit={handleTweetSubmit} />
      {isLoading ? (
        <MeowLoad>Loading Meows...</MeowLoad>
      ) : (
        tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
      )}
    </>
  );
};

const MeowLoad = styled.h2`
  margin-left: 38%;
`;

export default HomeFeed;
