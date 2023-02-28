import styled from "styled-components";
import { useContext } from "react";
import { CurrentUserContext } from "../../CurrentUserContext";
import LocationIcon from "../Icons/profileIcons/LocationIcon";

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div>
      {currentUser ? (
        <UserProfileBox>
          <img src={currentUser.bannerSrc} />
          <ProfilePic src={currentUser.avatarSrc} />
          <h2>{currentUser.displayName}</h2>
          <Handle>@{currentUser.handle}</Handle>
          <p>{currentUser.bio}</p>
          <p>
            <LocationIcon /> {currentUser.location}
          </p>
          <FollowContainer>
            <Follow>{currentUser.numFollowing} Following</Follow>
            <Follow>{currentUser.numFollowers} Followers</Follow>
          </FollowContainer>
        </UserProfileBox>
      ) : (
        <p>Loading...</p>
      )}
    </div>
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
