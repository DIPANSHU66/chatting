import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { setimage } from "../redux/userSlice";

const Photo = () => {
  const dispatch = useDispatch();

  const [photoUrl, setPhotoUrl] = useState("");
  const navigate = useNavigate();

  const filechangehandler = (e) => {
    const file = e.target.files?.[0];
    const objectURL = URL.createObjectURL(file);
    if (objectURL) setPhotoUrl(objectURL);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setimage(photoUrl));
    navigate("/register");
    setPhotoUrl("");
  };
  return (
    <div className="w-full max-w-sm p-6 mx-auto bg-gray-400 shadow-md rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Enter Profile Photo URL
      </h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={filechangehandler} />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <div className="  relative top-5  flex items-center justify-center">
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition transform hover:scale-105"
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
};

export default Photo;
