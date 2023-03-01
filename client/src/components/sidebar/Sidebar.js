import { COLORS } from "../../GlobalStyles";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../CurrentUserContext";

import {
  HomeIcon,
  BookmarkIcon,
  CatIcon,
  NotificationIcon,
  ProfileIcon,
} from "./IconsForSideBar";
import styled from "styled-components";

const Sidebar = () => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <SidebarContainer>
      <SideBarYuh>
        <Link to="/">{<CatIcon />}</Link>
        <ul>
          <li>
            <NavigationLink to="/" end>
              {<HomeIcon />}Home
            </NavigationLink>
          </li>
          <li>
            <NavigationLink to={currentUser?.handle}>
              {<ProfileIcon />}Profile
            </NavigationLink>
          </li>
          <li>
            <NavigationLink to="/notifications">
              {<NotificationIcon />}Notifications
            </NavigationLink>
          </li>
          <li>
            <NavigationLink to="/bookmarks">
              {<BookmarkIcon />}Bookmarks
            </NavigationLink>
          </li>
        </ul>
      </SideBarYuh>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  border: 2px solid black;
`;

const SideBarYuh = styled.div`
  width: 200px;
  height: 550px;
  background-color: #f0f0f0;
  padding: 20px;
  border: 2px solid black;
  font-size: 24px;
  font-weight: bold;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0;
    padding: 0;
    margin-top: 20px;
  }

  a {
    color: black;
    text-decoration: none;
  }
`;

const NavigationLink = styled(NavLink)`
  &:hover {
    background-color: ${COLORS.hover};
    border-radius: 80px;
    padding: 6px;
  }

  &.active {
    color: ${COLORS.primary};
  }
`;

export default Sidebar;
