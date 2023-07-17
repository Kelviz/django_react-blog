import React from "react";
import { FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";

import macbook from "../../assets/macbook.jpg";

const PostCard = ({ post }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[95%] h-[300px]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full rounded-lg object-fit shadow-lg"
        />
      </div>

      <h1 className="text-black mt-4 font-bold w-[90%] text-center text-[20px] lg:text-[30px] transition-colors duration-[1s] hover:text-pink-700 cursor-pointer">
        <Link to={`/post/${post.id}`}>{post.title}</Link>
      </h1>

      <div className="w-full flex justify-center items-center mt-5 text-gray-700 text-[14px]">
        <div className="flex w-auto justify-center items-center mr-4">
          <img
            src={macbook}
            alt={post.author}
            className="w-[30px] h-[30px] rounded-full "
          />
          <p className="ml-1">{post.author_username}</p>
        </div>
        <div className="text-pink-700 text-[18px] w-auto flex  justify-center items-center">
          <FaCalendar />
          <p className="ml-1 text-gray-700">
            {moment(post.created).format("MMM DD, YYYY")}
          </p>
        </div>
      </div>

      <div className="mt-4 w-[80%] text-gray-700 text-[19px] text-center">
        <p>{post.excerpt}</p>
      </div>

      <div className="mt-4 w-full flex justify-center items-center ">
        <Link
          to={`/post/${post.id}`}
          className="bg-pink-600 mt-3 text-white, lg:text-2 text-1 w-auto p-3 cursor-pointer rounded-full text-center transition duration-[1s] hover:py-4"
        >
          Continue Reading
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
