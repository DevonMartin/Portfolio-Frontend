import React, { useEffect } from "react";
import "./css/Home.css";
import Index1 from "./Index1";
import Index2 from "./Index2";
import HomeFooter from "./HomeFooter";

function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      <Index1 />
      <Index2 />
      <HomeFooter />
    </div>
  );
}

export default Home;
