import React, { useState, useEffect } from "react";
import moment from "moment";

const Comments = ({ comments }) => {
  const commentCount = comments.length;

  return (
    <>
      {comments.length > 0 && (
        <div className="bg-white mt-[17px] mb-[17px] flex flex-col justify-start items-start p-4 w-full rounded-lg text-black">
          <h1 className="mb-4 font-bold">{commentCount} Comments</h1>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4 w-full">
              <div className="flex w-full mb-3">
                <p className="font-bold mr-2">{comment.name}</p>
                <p>{moment(comment.created).format("MMM DD, YYYY")}</p>
              </div>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Comments;
