import React, { useRef, useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import asus from "../../assets/asus.png";
import "./FeaturePost.css";

const FeaturePost = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/featured/")
      .then((response) => {
        setFeaturedPosts(response.data);
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  const containerRef = useRef(null);

  const handleLeftArrowClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 200; // Adjust the scroll amount as needed
    }
  };

  const handleRightArrowClick = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 200; // Adjust the scroll amount as needed
    }
  };

  return (
    <>
      <div className="w-full relative flex justify-start items-center">
        <div className="button-container left-button">
          <button
            className="bg-pink-400 text-white-600 px-3 py-3 rounded-full font-bold z-10 lg:left-[9vw] left-[1vw]"
            onClick={handleLeftArrowClick}
          >
            <HiChevronLeft />
          </button>
        </div>

        <div
          className="overflow-x-auto no-scrollbar flex justify-start items-center w-full"
          ref={containerRef}
        >
          <div className="flex justify-start items-center w-full [&>div]:flex-shrink-0">
            {featuredPosts.map((featured) => (
              <div
                className="flex lg:w-[210px] w-[280px] h-72 min-w-0 m-3 relative rounded-lg"
                key={featured.id}
              >
                <img
                  src={featured.image}
                  alt="Image"
                  className="w-full rounded-lg cover"
                />
                <div className="absolute w-full h-full top-0 left-0 flex items-center rounded-lg justify-center  bg-gray-700 shadow-md bg-opacity-30">
                  <Link
                    to={`/post/${featured.id}`}
                    className="w-full h-full flex flex-col rounded-lg items-center justify-center p-2 text-center font-bold"
                  >
                    <small className="mb-2">
                      {moment(featured.created).format("MMM DD, YYYY")}
                    </small>
                    <p className="mt-2 text-shadow font-semibold lg:text-2xl text-[20px]">
                      {featured.title}
                    </p>

                    <div className="flex items-center justify-center w-full absolute bottom-2 overflow-hidden">
                      <img
                        src={asus}
                        alt="Image"
                        className="w-7 h-7 mr-1 rounded-full border object-fit"
                      />

                      <small>{featured.author_username}</small>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="button-container right-button">
            <button
              className="bg-pink-400 text-white-600 px-3 py-3 rounded-full font-bold z-10 lg:right-[9vw] right-[1vw]"
              onClick={handleRightArrowClick}
            >
              <HiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturePost;
