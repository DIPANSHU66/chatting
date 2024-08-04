import React, { useEffect } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
const useGetMessage = async () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:8000/api/v1/message/${selectedUser?._id}`
        );
        dispatch(setMessages(res.data));
      } catch (e) {
        console.log(e);
      }
    };
    fetchMessages();
  }, [selectedUser]);
};

export default useGetMessage;
