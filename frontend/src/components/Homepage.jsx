import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
const Homepage = () => {
  return (
    <div className="flex flex-col sm:flex-row h-auto  min-h-screen rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar className="flex-1" />
      <MessageContainer className="w-full sm:w-1/4 md:w-1/8 lg:w-1/6" />
    </div>
  );
};

export default Homepage;
