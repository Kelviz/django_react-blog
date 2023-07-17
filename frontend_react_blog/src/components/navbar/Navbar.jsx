import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import axios from "axios";

import "./Navbar.css";

const Navbar = () => {
  const [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/category/")
      .then((response) => {
        setNavLinks(response.data);
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [toggle, setToggle] = useState(false);
  return (
    <nav className="app__navbar flex w-full justify-between items-center border-b border-blue-400 py-4 lg:py-6">
      <div className="app__navbar-logo w-140">
        <h1 className="font-bold text-[24px] lg:text-[34px] w-full">
          <Link to="/">Vix Blog</Link>
        </h1>
      </div>

      <ul className="app__navbar-links  w-300 hidden items-center h-8 lg:flex">
        {navLinks.map((item) => (
          <li
            key={`link-${item.id}`}
            className="mx-2 hover:opacity-90 font-bold"
          >
            <a href={`/categoryPosts/${item.id}`}>{item.name}</a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu relative flex  justify-center items-center lg:hidden">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="w-[300px] bg-white h-screen fixed top-0 p-4 right-0 z-20 flex items-end flex-col lg:hidden"
          >
            <HiX onClick={() => setToggle(false)} />

            <ul className="w-full">
              {navLinks.map((item) => (
                <li key={`link-${item.id}`} className="mt-7 w-auto">
                  <a
                    href={`/categoryPosts/${item.id}`}
                    onClick={() => setToggle(false)}
                    className="transition-colors duration-[1s] hover:text-red-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
