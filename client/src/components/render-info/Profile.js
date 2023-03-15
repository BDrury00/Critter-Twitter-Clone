import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LocationIcon from "../Icons/profileIcons/LocationIcon";
import ErrorPage from "../../ErrorPage";
import Tweet from "../../Tweet";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [status, setStatus] = useState("loading");
  const { profileId } = useParams();

  //Profile fetch
  useEffect(() => {
    fetch(`/api/${profileId}/profile`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response failed!");
        }
        return res.json();
      })
      .then((data) => {
        setProfile(data.profile);
        setStatus("success");
      })
      .catch((error) => {
        console.log("There was an error fetching user profile: ", error);
        setStatus("error");
      });
  }, [profileId]);

  console.log(profileId);
  // profiles tweets feed fetch
  useEffect(() => {
    fetch(`/api/${profileId}/feed`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response failed!");
        }
        return res.json();
      })
      .then((data) => {
        const sortedTweets = data.tweetIds.map(
          (tweetId) => data.tweetsById[tweetId]
        );
        setTweets(sortedTweets);
        setStatus("success");
        console.log(sortedTweets);
      })
      .catch((error) => {
        console.log("There was an error fetching user tweets: ", error);
      });
  }, [profileId]);

  if (status === "loading") {
    return <h2>Loading Profile...</h2>;
  }
  // ErrorPage not working
  if (status === "error") {
    return <ErrorPage />;
  }

  return (
    <>
      <UserProfileBox>
        <img src={profile.bannerSrc} />
        <ProfilePic src={profile.avatarSrc} />
        <h2>{profile.displayName}</h2>
        <Handle>@{profile.handle}</Handle>
        <p>{profile.bio}</p>
        <p>
          <LocationIcon /> {profile.location}
        </p>
        <FollowContainer>
          <Follow>{profile.numFollowing} Following</Follow>
          <Follow>{profile.numFollowers} Followers</Follow>
        </FollowContainer>
      </UserProfileBox>

      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </>
  );
};

//styled components

const UserProfileBox = styled.div`
  display: flex;
  flex-direction: column;

  img {
  }
`;

const ProfilePic = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-top: -10%;
  margin-left: 10px;
  border: 3px solid white;
`;

const FollowContainer = styled.div`
  display: flex;
`;

const Follow = styled.p`
  margin-right: 10px;
`;

const Handle = styled.p`
  margin-top: -20px;
`;

export default Profile;
