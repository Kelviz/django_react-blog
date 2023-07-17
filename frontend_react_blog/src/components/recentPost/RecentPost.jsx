import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RecentPost = () => {
  const [RecentPosts, setRecentPosts] = useState([]);
  const page = 1;

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/posts/?page=${page}`)
      .then((response) => {
        console.log(response.data);
        setRecentPosts(response.data.results);
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="bg-white w-full h-auto rounded-lg p-4 text-black">
        <h1 className="mb-7 font-bold">Recent Posts</h1>

        <div className="flex flex-col w-full justify-start">
          {RecentPosts.slice(0, 3).map((post) => (
            <Link to={`/post/${post.id}`}>
              <div
                className="my-3 flex justify-start items-start"
                key={post.id}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-[40px] h-[40px] rounded-full"
                />
                <div className="ml-2 text-gray-700 text-[14px]">
                  <p>{post.date}</p>
                  <p>{post.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentPost;
