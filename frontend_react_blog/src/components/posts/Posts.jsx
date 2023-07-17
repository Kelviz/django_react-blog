import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "react-paginate";

import PostCard from "./PostCard";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 4;
  const apiUrl = process.env.API_URL;

  console.log("api url");
  console.log(apiUrl);
  const fetchPosts = async (page) => {
    try {
      const response = await axios.get(`${apiUrl}/posts/?page=${page}`);
      setPosts(response.data.results);

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
  }, [currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <>
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white w-full h-auto mb-3 flex flex-col p-4 shadow-md rounded-lg items-center"
        >
          <PostCard post={post} />
        </div>
      ))}

      <Pagination
        pageCount={totalPages}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item disabled"
        breakLinkClassName="page-link"
        previousLabel="&#8592;"
        nextLabel="&#8594;"
        breakLabel={"..."}
      />
    </>
  );
};

export default Posts;
