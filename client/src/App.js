import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import HomeFeed from "./components/render-info/HomeFeed";
import Notifications from "./components/render-info/Notifications";
import Bookmarks from "./components/render-info/Bookmarks";
import TweetDetails from "./components/render-info/TweetDetails";
import Profile from "./components/render-info/Profile";
import styled from "styled-components";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Container>
          <SideBarContainer>
            <Sidebar />
          </SideBarContainer>
          <Content>
            <Routes>
              <Route path="/" element={<HomeFeed />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
              <Route path="/tweet/:tweetId" element={<TweetDetails />} />
              <Route path="/profile/:profileId" element={<Profile />} />
            </Routes>
          </Content>
        </Container>
      </BrowserRouter>
    </>
  );
};

// Container with everything
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

//sidebar placement
const SideBarContainer = styled.div`
  border: 2px solid blue;
`;

// content placement
const Content = styled.div`
  border: 2px solid red;

  max-width: 35%;
`;

export default App;
