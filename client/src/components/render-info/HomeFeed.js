import { useEffect, useState } from "react";
import Tweet from "../../Tweet";
import TweetInputBox from "../../TweetInputBox";
import styled from "styled-components";
import ErrorPage from "../../ErrorPage";

const HomeFeed = () => {
  //useStatates
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    //fetch for homefeed
    fetch("/api/me/home-feed")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response failed!");
        }
        return response.json();
      })
      .then((data) => {
        const sortedTweets = data.tweetIds.map(
          (tweetId) => data.tweetsById[tweetId]
        );
        setTweets(sortedTweets);
        setIsLoading(false);
        setStatus("success");
        console.log(sortedTweets);
      })
      .catch((error) => {
        console.error("Error fetching home feed:", error);
        setStatus("error");
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
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response failed!");
        }
        return response.json();
      })
      .then((data) => {
        // check if my tweet was successfully submitted :)
        console.log("New tweet created:", data);
        setReload(!reload);
      })
      .catch((error) => {
        // Wasn't succesfull :(
        console.error("Error creating tweet:", error);
        alert("Failed to create Meow. Please refresh the page and try again!");
      });
  };

  if (status === "loading") {
    return <MeowLoad>Loading Home Feed...</MeowLoad>;
  }

  if (status === "error") {
    return <ErrorPage />;
  }

  return (
    <>
      <TweetInputBox onSubmit={handleTweetSubmit} />
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </>
  );
};

const MeowLoad = styled.h2`
  margin-left: 38%;
  margin-top: 30%;
`;

export default HomeFeed;
