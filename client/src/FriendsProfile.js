import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LocationIcon from "../../client/src/components/Icons/profileIcons/LocationIcon";

const FriendsProfile = () => {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("loading");
  const { handle } = useParams();

  useEffect(() => {
    fetch(`/api/${handle}/profile`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile);
        setStatus("success");
      })
      .catch((error) => {
        console.log("There was an error fetching user profile: ", error);
        setStatus("error");
      });
  }, [handle]);

  if (status === "loading") {
    return <p>Loading Profile Meow...</p>;
  }

  if (status === "error") {
    return <p>There was an error fetching the user profile</p>;
  }

  return (
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

export default FriendsProfile;
