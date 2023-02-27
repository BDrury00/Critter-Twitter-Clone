import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";
import styled from "styled-components";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SideBarYuh>
        <Link to="/">{<Logo />}</Link>
        <ul>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/profileId">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/notifications">Notifications</NavLink>
          </li>
          <li>
            <NavLink to="/bookmarks">Bookmarks</NavLink>
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
  background-color: #f0f0f0;
  padding: 20px;
  border: 2px solid black;
`;

export default Sidebar;
