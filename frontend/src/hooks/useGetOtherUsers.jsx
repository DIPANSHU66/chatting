import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setotherusers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchotherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get("https://new-m6ou.onrender.com/api/v1/");
        dispatch(setotherusers(res.data));
      } catch (e) {
        console.log(e);
      }
    };
    fetchotherUsers();
  }, []);
};

export default useGetOtherUsers;
