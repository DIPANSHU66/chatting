import React, { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
const Message = (props) => {
  const scroll = useRef();
  const message = props.message;
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const [text, setText] = useState(message?.message);
  let photo =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  photo =
    message?.senderId == authUser?._id
      ? authUser?.profilePhoto
      : selectedUser?.profilePhoto;
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);

  const deletehandler = async (e) => {
    e.preventDefault();
    if(  authUser?._id != message?.senderId)return ;
    try {
      const res = await axios.post(
        "https://new-m6ou.onrender.com/api/v1/message/delete",
        message,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        window.location.reload();
      }
    } catch (e) {
      toast.error(error.response.data.message);
    }
    setText(message?.message);
  };

  return (
    <div
      ref={scroll}
      className={`chat ${
        authUser?._id == message?.senderId ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            className="hover:transition-transform duration-300 ease-in-out transform hover:scale-150 rounded shadow-lg"
            alt="Tailwind CSS chat bubble component"
            src={photo}
            onClick={deletehandler}
          />
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
        } hover:bg-blue-500 
         hover:border-2 `}
        onClick={deletehandler}
      >
        {text}
      </div>
      <div className="chat-footer opacity-50"></div>
    </div>
  );
};

export default Message;
