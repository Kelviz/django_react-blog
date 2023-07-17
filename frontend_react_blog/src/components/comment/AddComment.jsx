import React, { useState, useEffect } from "react";
import axios from "axios";
import Comments from "./Comments";

const AddComment = ({ postId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [saveDetails, setSaveDetails] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const savedName = localStorage.getItem("commentName");
    const savedEmail = localStorage.getItem("commentEmail");
    const savedCheckboxValue = localStorage.getItem("saveDetails") === "true";

    setName(savedName || "");
    setEmail(savedEmail || "");
    setSaveDetails(savedCheckboxValue || false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      body,
      post_id: postId,
    };

    if (name.trim() === "") {
      setNameError("Name is required");
      return;
    }

    if (email.trim() === "") {
      setEmailError("email is required");
      return;
    }

    if (!isValidEmail(email)) {
      {
        setEmailError("Invalid email format");
        return;
      }
    }

    axios
      .post("http://127.0.0.1:8000/api/add-comment/", formData)
      .then((response) => {
        console.log(response.data);

        setComments((prevComments) => [...prevComments, response.data]);

        if (saveDetails) {
          localStorage.setItem("commentName", name);
          localStorage.setItem("commentEmail", email);
          localStorage.setItem("saveDetails", saveDetails);
        } else {
          localStorage.removeItem("commentName");
          localStorage.removeItem("commentEmail");
          localStorage.setItem("saveDetails", saveDetails);
        }

        setBody("");

        setNameError("");
        setEmailError("");
      });
  };

  useEffect(() => {
    const savedName = localStorage.getItem("commentName");
    const savedEmail = localStorage.getItem("commentEmail");

    // Set the comment details from local storage
    if (savedName) {
      setName(savedName);
    }
    if (savedEmail) {
      setEmail(savedEmail);
    }

    axios
      .get(`http://127.0.0.1:8000/api/comments/${postId}/`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postId]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const handleSaveDetailsChange = (e) => {
    const checked = e.target.checked;
    setSaveDetails(checked);
  };

  const isValidEmail = (value) => {
    // Simple email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  return (
    <>
      <div className="w-full bg-white flex flex-col text-black justify-center mt-9 rounded-lg items-center">
        <h1 className="w-[90%] text-left mt-3 pt-4">Leave a Reply</h1>
        <form
          onSubmit={handleSubmit}
          className="w-[90%] flex-col mt-4 border-t border-black text-black"
        >
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Your Comment"
            className="mt-4 bg-gray-100 w-full p-3 h-[170px] rounded-lg"
          ></textarea>
          <div className="w-full flex mt-4  justify-between items center">
            <div className="w-[48%] flex flex-col">
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Your Name"
                className="w-full bg-gray-100 rounded-lg p-3"
              />
              {nameError && (
                <p className="text-red-700 w-full text-right">{nameError}</p>
              )}
            </div>
            <div className="w-[48%] flex flex-col">
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="Your Email"
                className="w-full bg-gray-100 rounded-lg p-3"
              />
              {emailError && (
                <p className="text-red-700 w-full text-right"> {emailError} </p>
              )}
            </div>
          </div>

          <div>
            <input
              type="checkbox"
              checked={saveDetails}
              onChange={handleSaveDetailsChange}
              className="mt-9 cursor-pointer"
            />
            <label>
              {" "}
              Save my name, email in this browser for the next time I comment.
            </label>
          </div>

          <button
            type="submit"
            className="w-auto lg:p-4 p-3 lg:text-[17px] text-[14px] bg-pink-700 rounded-full text-center font-bold text-white my-9 transition duration-[1s] hover:bg-purple-900"
          >
            Post Comment
          </button>
        </form>
      </div>

      <div className="w-full">
        <Comments comments={comments} />
      </div>
    </>
  );
};

export default AddComment;
