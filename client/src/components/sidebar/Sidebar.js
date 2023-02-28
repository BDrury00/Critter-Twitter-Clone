import React from "react";
import { Link, NavLink } from "react-router-dom";

import {
  HomeIcon,
  BookmarkIcon,
  CatIcon,
  NotificationIcon,
  ProfileIcon,
} from "./IconsForSideBar";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SideBarYuh>
        <Link to="/">{<CatIcon />}</Link>
        <ul>
          <li>
            <NavLink to="/" end>
              {<HomeIcon />}Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile/meow">{<ProfileIcon />}Profile</NavLink>
          </li>
          <li>
            <NavLink to="/notifications">
              {<NotificationIcon />}Notifications
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookmarks">{<BookmarkIcon />}Bookmarks</NavLink>
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

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Sidebar;
