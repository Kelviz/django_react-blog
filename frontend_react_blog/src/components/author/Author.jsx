import React from "react";

import carBlack from "../../assets/carBlack.jpg";

const Author = () => {
  return (
    <div className="w-full flex justify-center items-center bg-black bg-opacity-20 mt-[100px] p-8 relative rounded-lg">
      <img
        src={carBlack}
        alt="author"
        className="w-[100px] h-[100px] lg:bottom-[130px] bottom-[180px] rounded-full absolute"
      />
      <div className="w-full mt-[40px] flex text-center flex-col justify-center items-center">
        <h2 className="font-bold text-[23px] mb-4">UrchDev</h2>
        <p>
          Your professional software engineer, web developer and am avialable
          for your web developement jobs
        </p>
      </div>
    </div>
  );
};

export default Author;
