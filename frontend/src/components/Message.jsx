import React, { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const Message = (props) => {
  const scroll = useRef();
  const message = props.message;
  const { selectedUser, authUser } = useSelector((store) => store.user);
  let photo =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  photo =
    message?.senderId == authUser?._id
      ? authUser?.profilePhoto
      : selectedUser?.profilePhoto;
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);

  return (
    <div
      ref={scroll}
      className={`chat ${
        authUser?._id == message?.senderId ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={photo} />
        </div>
      </div>
      <div className="chat-header">
        <time className=" opacity-50    font-semibold  text-white">
          {new Date(message?.createdAt).toLocaleTimeString()}
        </time>
      </div>
      <div
        className={`chat-bubble ${
          authUser?._id != message?.senderId
            ? "bg-gray-200 text-black"
            : "chat-start"
        }`}
      >
        {message?.message}
      </div>
      <div className="chat-footer opacity-50"></div>
    </div>
  );
};

export default Message;
