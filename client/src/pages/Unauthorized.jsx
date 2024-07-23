import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="flex flex-col justify-center">
          <h1 className="my-2 text-white font-bold text-2xl">
              {"Looks like you've found the doorway to the great nothing"}
          </h1>
          <p className="my-2 text-white text-center">Sorry about that! Please visit our hompage to get where you need to go.</p>
          <Link to="/" className="self-center w-64 my-4 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">
            Take me there!
          </Link>
      </div>
      <div>
          <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
};

export default Unauthorized;
