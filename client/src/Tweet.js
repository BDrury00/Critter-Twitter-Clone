import styled from "styled-components";
import {
  UnlikeTweetIcon,
  LikeTweetIcon,
  RetweetIcon,
  ShareIcon,
  CommentBoxIcon,
  SmallRetweetIcon,
} from "../src/components/Icons/tweet/IconsForTweets";
import { format } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";

const Tweet = ({ tweet }) => {
  const { author, timestamp, status, media, isLiked, numLikes, retweetFrom } =
    tweet;

  //stuff for liking

  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(numLikes);

  const handleLikeClick = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <TweetBox>
      {retweetFrom && (
        <Retweeted>
          <SmallRetweetIcon /> {retweetFrom.displayName} Remeowed
        </Retweeted>
      )}
      <FlexBoxContainer>
        <ProfilePics src={author.avatarSrc} alt={author.displayName} />
        <TweetTop>
          <span>{author.displayName}</span>
          <span>
            <NavToProfile href={`/${author.handle}`}>
              @{author.handle}
            </NavToProfile>
          </span>
          <span>{format(new Date(timestamp), "MMM do")}</span>
          <LinktoTweetDetails>
            <Link to={`/tweet/${tweet.id}`}>
              <UsersStatus>{status}</UsersStatus>
            </Link>
          </LinktoTweetDetails>
        </TweetTop>
      </FlexBoxContainer>

      <div>
        <Link to={`/tweet/${tweet.id}`}>
          {media.map((item, index) => (
            <TweetImage key={index} src={item.url} alt={item.type} />
          ))}
        </Link>
      </div>

      <IconsAtBottom>
        <span>
          <CommentBoxIcon />
        </span>
        <LikeContainer>
          <span onClick={handleLikeClick}>
            {liked ? <LikeTweetIcon /> : <UnlikeTweetIcon />}
          </span>
          {likes > 0 && <span className="likes-count">{likes}</span>}
        </LikeContainer>
        <span>
          <RetweetIcon />
        </span>
        <span>
          <ShareIcon />
        </span>
      </IconsAtBottom>
    </TweetBox>
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

const TweetImage = styled.img`
  display: block;
  margin: 0 auto;
  width: 80%;
  max-height: 350px;
  border-radius: 30px;
`;

//organization of info in tweetboxes

const TweetTop = styled.div`
  span:first-child {
    margin-right: -4px;
    font-weight: bold;
    font-size: 1.2rem;
  }

  span:not(:first-child) {
    margin-left: 10px;
  }
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
const LikeContainer = styled.div``;
const FlexBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 5px;
`;

const UsersStatus = styled.div`
  word-wrap: break-word;
  max-width: 500px;
`;

const NavToProfile = styled.a`
  text-decoration: none;
  color: grey;
`;

const LinktoTweetDetails = styled.div`
  a {
    text-decoration: none;
    color: black;
  }
`;

export default Tweet;
