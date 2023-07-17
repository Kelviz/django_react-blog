import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

const NextPostDetail = () => {
  const { postId } = useParams();
  const [nextPost, setNextPost] = useState(null);

  useEffect(() => {
    const fetchAdjacentPosts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/posts/${postId}/adjacent_posts/`
        );
        setNextPost(response.data.next);
        console.log(response.data.next);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdjacentPosts();
  }, [postId]);

  const divStyle = nextPost
    ? {
        backgroundImage: `url(http://127.0.0.1:8000${nextPost.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : null;

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {nextPost && (
        <div className="w-full h-[280px] mt-[40px] relative rounded-lg adjacent-post">
          <div style={divStyle} className="absolute rounded-lg w-full h-full" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b opacity-50 from-gray-400 via-gray-700 to-black rounded-lg" />
          <div className="w-full h-full flex flex-col justify-center items-center font-bold absolute">
            <small>{moment(nextPost.created).format("MMM DD, YYYY")}</small>
            <h1 className="text-[24px]">{nextPost.title}</h1>
          </div>

          <div className="absolute right-1 bottom-3 w-10 h-10 bg-pink-500 flex items-center justify-center rounded-full arrow-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white w-full"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>

          <Link
            to={`/post/${nextPost.id}`}
            className="w-full h-full absolute rounded-lg"
            onClick={handleLinkClick}
          ></Link>
        </div>
      )}
    </>
  );
};

export default NextPostDetail;
