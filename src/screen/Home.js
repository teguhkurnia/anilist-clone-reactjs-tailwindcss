import React from "react";
import ItemsWrapper from "../components/layouts/ItemsWrapper";

const Home = () => {
  return (
    <div className="home">
      <ItemsWrapper
        title="TRENDING NOW"
        sort={["TRENDING_DESC", "POPULARITY_DESC"]}
      />
      <ItemsWrapper
        title="POPULAR THIS SEASON"
        sort={["POPULARITY_DESC"]}
        season="FALL"
        year={2020}
      />
      <ItemsWrapper
        title="UPCOMMING NEXT"
        sort={["POPULARITY_DESC"]}
        season="WINTER"
        year={2021}
      />
      <ItemsWrapper title="ALL TIME POPULAR" sort={["POPULARITY_DESC"]} />
    </div>
  );
};

export default Home;
