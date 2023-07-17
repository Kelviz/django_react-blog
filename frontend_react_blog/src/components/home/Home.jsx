import React from "react";
import StickyBox from "react-sticky-box";

import Posts from "../posts/Posts";
import FeaturePost from "../featurePosts/FeaturePost";
import Category from "../categories/Category";
import RecentPost from "../recentPost/RecentPost";

const Home = () => {
  return (
    <div className="w-full flex flex-col flex justify-center items-center">
      <div className="featured-post flex  justify-center items-center mt-4">
        <FeaturePost />
      </div>

      <div className="w-full mt-4 flex flex-col  lg:flex-row lg:justify-between lg:items-start justify-center items-center">
        <div className="lg:w-[64%] sm:w-[94%]  md:w-[74%]  mt-4 posts">
          <Posts />
        </div>

        <div className="lg:w-[30%] sm:w-[94%]  md:w-[74%] mt-4 sidebar sticky top-1">
          <RecentPost />
          <Category />
        </div>
      </div>
    </div>
  );
};

export default Home;
