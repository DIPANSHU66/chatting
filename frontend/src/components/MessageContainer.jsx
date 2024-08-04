import React, { useEffect } from "react";
import Sendinput from "./Sendinput";
import Messages from "./Messages";
import { useSelector } from "react-redux";
import { FaSmile } from "react-icons/fa";

const MessageContainer = () => {
  const { selectedUser, authUser, onlineusers } = useSelector(
    (store) => store.user
  );
  const isOnline = onlineusers?.includes(selectedUser?._id);
  const profile = selectedUser
    ? selectedUser.profilePhoto
    : "https://th.bing.com/th/id/OIP.0GSgnZDVwXfEgTtYKUHBiQHaHk?w=186&h=188&c=7&r=0&o=5&dpr=1.5&pid=1.7";

  return selectedUser != null ? (
    <div className="md:min-w-[450px] flex flex-col">
      <div>
        <div className="flex gap-2   items-center  text-white bg-zinc-800   px-4 py-2    mb-2 ">
          <div className={` avatar${isOnline ? "online" : ""}`}>
            <div className="w-12  rounded-full">
              <img src={profile} alt="profile" />
            </div>
          </div>

          <div className="">
            <p>{selectedUser?.fullname}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0"></div>
      <Messages></Messages>
      <Sendinput></Sendinput>
    </div>
  ) : (
    <div className="md:min-w-[450px] flex flex-col justify-center items-center">
      <h1 className="text-4xl  text-white flex items-center  font-bold">
        <FaSmile className="mr-2" /> Hi, {authUser?.fullname}!
      </h1>
      <h1 className=" flex  items-center justify-center text-3xl text-white  ">
        Let's Start a Conversation{" "}
        <span role="img" aria-label="speech balloon">
          💬
        </span>
      </h1>
    </div>
  );
};

export default MessageContainer;
