import styled from "styled-components";
import {
  UnlikeTweetIcon,
  LikeTweetIcon,
} from "../src/components/Icons/tweet/IconsForTweets";
import { format } from "date-fns";
import { useState } from "react";

const Tweet = ({ tweet }) => {
  const {
    author,
    timestamp,
    status,
    media,
    isLiked,
    numLikes,
    isRetweeted,
    numRetweets,
  } = tweet;

  //stuff for liking

  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(numLikes);

  const handleLikeClick = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <TweetBox>
      <ProfilePics src={author.avatarSrc} alt={author.displayName} />
      <div>
        <TweetTop>
          <span>{author.displayName}</span>
          <span>@{author.handle}</span>
          <span>{format(new Date(timestamp), "MMM dd")}</span>
        </TweetTop>
        <div>{status}</div>
        {media.map((item, index) => (
          <TweetImage key={index} src={item.url} alt={item.type} />
        ))}
        <div>
          <span onClick={handleLikeClick}>
            {liked ? <LikeTweetIcon /> : <UnlikeTweetIcon />}
          </span>
          <span>{likes}</span>
          <span>{isRetweeted ? "Retweeted" : "Not retweeted"}</span>
        </div>
      </div>
    </TweetBox>
  );
};

const TweetBox = styled.div`
  border: 1px solid lightgray;
`;

const ProfilePics = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
`;

const TweetImage = styled.img`
  width: 100%;
  max-height: 300px;
`;

//organization of info in tweetboxes

const TweetTop = styled.div`
  display: flex;
`;

export default Tweet;
