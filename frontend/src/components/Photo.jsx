import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Photo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imageRef = useRef();
  const [photourl, setPhotourl] = useState("");
  const filechangehandler = (e) => {
    const file = e.target.files?.[0];
    const objectURL = URL.createObjectURL(file);
    if (objectURL) setPhotourl(objectURL);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setPhotourl(photourl));
    navigate("/register");
    setfile("");
  };

  return (
    <div className="w-full max-w-sm p-6 mx-auto bg-gray-400 shadow-md rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Enter Profile Photo URL
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          ref={imageRef}
          className="hidden"
          onChange={filechangehandler}
        />
        <button
          onClick={() => imageRef.current.click()}
          className="w-fit rounded-md border text-center bg-[#0095F6] hover:bg-[#258bcf]"
        >
          Select from Device
        </button>
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
