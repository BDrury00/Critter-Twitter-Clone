import styled from "styled-components";
import ErrorPage from "../../ErrorPage";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  UnlikeTweetIcon,
  LikeTweetIcon,
  RetweetIcon,
  ShareIcon,
  CommentBoxIcon,
  SmallRetweetIcon,
} from "../Icons/tweet/IconsForTweets";

const TweetDetails = () => {
  // useStates and params
  const [tweet, settweet] = useState(null);
  const [status, setStatus] = useState("loading");
  const { tweetId } = useParams();

  // fetch the tweet details endpoint
  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then((response) => {
        if (!response) {
          throw new Error("Network response failed!");
        }
        return response.json();
      })
      .then((data) => {
        settweet(data.tweet);
        setStatus("success");
      })
      .catch((error) => {
        console.log("Error retrieving tweet details:", error);
        setStatus("error");
      });
  }, [tweetId]);

  if (status === "loading") {
    return <h2>Loading Tweet Details...</h2>;
  }

  if (status === "error") {
    return <ErrorPage />;
  }

  return (
    <>
      <TweetBox>
        {tweet.retweetFrom && (
          <Retweeted>
            <SmallRetweetIcon /> {tweet.retweetFrom.displayName} Remeowed
          </Retweeted>
        )}
        <FlexBoxContainer>
          <ProfilePics
            src={tweet.author.avatarSrc}
            alt={tweet.author.displayName}
          />
          <TweetTop>
            <span>{tweet.author.displayName}</span>
            <span>
              <NavToProfile href={`/${tweet.author.handle}`}>
                @{tweet.author.handle}
              </NavToProfile>
            </span>
          </TweetTop>
        </FlexBoxContainer>
        <StatusText>{tweet.status}</StatusText>
        <div>
          {tweet.media &&
            tweet.media.map((asset) => (
              <TweetImage key={asset.url} src={asset.url} alt={tweet.status} />
            ))}
        </div>
        <Time>
          {format(new Date(tweet.timestamp), "h:mm a '•' MMM d yyyy")} • Critter
          web app
        </Time>
        <IconsAtBottom>
          <span>
            <CommentBoxIcon />
          </span>
          <span>
            <RetweetIcon />
          </span>
          <LikeContainer>
            <span>
              <UnlikeTweetIcon />
            </span>
          </LikeContainer>

          <span>
            <ShareIcon />
          </span>
        </IconsAtBottom>
      </TweetBox>
    </>
  );
};

const TweetBox = styled.div`
  border: 1px solid lightgray;
  min-height: 150px;
`;

const Retweeted = styled.span`
  margin-left: 2%;
  color: grey;
`;

const ProfilePics = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;

const FlexBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 5px;
`;

const NavToProfile = styled.a`
  text-decoration: none;
  color: grey;
`;

const TweetTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  span:first-child {
    margin-right: -4px;
    font-weight: bold;
    font-size: 1.2rem;
  }

  span:not(:first-child) {
    margin-left: 10px;
  }
`;

const TweetImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 95%;
  max-height: 450px;
  border-radius: 30px;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const IconsAtBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 15%;
  max-width: 70%;
  justify-content: space-between;

  .likes-count {
    margin-left: 3px;
  }
`;

const Time = styled.span`
  color: grey;
  margin-left: 25px;
`;

const StatusText = styled.div`
  font-size: 24px;
  margin-top: 20px;
  font-weight: 600;
`;

const LikeContainer = styled.div``;

export default TweetDetails;
