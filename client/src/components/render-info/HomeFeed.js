import { useEffect, useState } from "react";
import Tweet from "../../Tweet";

const HomeFeed = () => {
  //useStatates
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    //fetch for homefeed
    fetch("/api/me/home-feed")
      .then((response) => response.json())
      .then((data) => {
        const sortedTweets = data.tweetIds.map(
          (tweetId) => data.tweetsById[tweetId]
        );
        setTweets(sortedTweets);
        console.log(sortedTweets);
      });
  }, []);

  return (
    <>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </>
  );
};

export default HomeFeed;
