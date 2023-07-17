import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RelatedPosts = ({ category }) => {
  const [related, setRelated] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 4;

  const fetchPosts = async (page) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/categoryPosts/${category}/?page=${page}`
      );
      setRelated(response.data.results);

      const totalCount = response.data.count;
      const totalPagesCount = Math.ceil(totalCount / postsPerPage);
      setTotalPages(totalPagesCount);
      console.log(totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, category]);

  return (
    <>
      <div className="bg-white w-full h-auto rounded-lg p-4 text-black">
        <h1 className="mb-7 font-bold">Related Posts</h1>

        <div className="flex flex-col w-full justify-start">
          {related.slice(0, 3).map((post) => (
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

export default RelatedPosts;
