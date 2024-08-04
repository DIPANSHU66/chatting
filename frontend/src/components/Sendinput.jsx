import { React, useState } from "react";

import { IoSend } from "react-icons/io5";

import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

import { setMessages } from "../redux/messageSlice";

const Sendinput = () => {
  const [message, setmessage] = useState("");

  const dispatch = useDispatch();

  const { selectedUser } = useSelector((store) => store.user);

  const { messages } = useSelector((store) => store.message);

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      dispatch(setMessages([...messages, res?.data?.newMessage]));
    } catch (e) {
      console.log(e);
    }

    setmessage("");
  };

  return (
    <form onSubmit={submithandler} className="px-4 my-3">
      <div className="w-full relative">
        <input
          onChange={(e) => setmessage(e.target.value)}
          type="text"
          placeholder="Send a message...."
          value={message}
          className="border   text-sm rounded-lg w-full   block  p-3 border-zinc-500  text-white   bg-gray-600 "
        />
        <button
          type="submit"
          className="absolute flex  inset-y-0 right-2   items-center"
        >
          <IoSend></IoSend>
        </button>
      </div>
    </form>
  );
};

export default Sendinput;
