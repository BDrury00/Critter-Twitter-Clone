import React from "react";
import Logo from "./Logo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeFeed from ".//components/HomeFeed/HomeFeed";
import Notifications from ".//components/Notifications/Notifications";
import Bookmarks from ".//components/Bookmarks/Bookmarks";
import TweetDetails from ".//components/TweetDetails/TweetDetails";
import Profile from ".//components/Profile/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Logo />
        <Routes>
          <Route path="/" element={<HomeFeed />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/tweet/:tweetId" element={<TweetDetails />} />
          <Route path="/profileId" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
