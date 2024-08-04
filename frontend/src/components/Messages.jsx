import React from "react";
import Message from "../components/Message";
import useGetRealTimeMessage from "../hooks/useGetRealTimeMessage";
import { useSelector } from "react-redux";
import useGetMessage from "../hooks/useGetMessage";

const Messages = () => {
  useGetRealTimeMessage();
  useGetMessage();

  const { messages } = useSelector((store) => store.message);

  if (!messages) return;

  return (
    <div className="px-4  flex-1  overflow-auto">
      {messages &&
        messages.map((message) => {
          return <Message key={message?._id} message={message} />;
        })}
    </div>
  );
};

export default Messages;
