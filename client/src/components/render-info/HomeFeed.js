import { useEffect, useState } from "react";

const HomeFeed = () => {
  //useStatates
  const [homeData, setHomeData] = useState(null);
  fetch();

  useEffect(() => {
    //fetch for homefeed
    fetch();
  }, []);
  return (
    <>
      <div>HomeFeed</div>
      <div>hhhh</div>
    </>
  );
};

export default HomeFeed;
