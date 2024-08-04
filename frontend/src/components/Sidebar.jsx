import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import Otherusers from "./Otherusers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuthUser, setotherusers } from "../redux/userSlice";
const Sidebar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { otherusers } = useSelector((store) => store.user);

  const navigate = useNavigate();

  function timer() {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  const logouthandler = async () => {
    try {
      const res = await axios.get(
        "https://new-m6ou.onrender.com/api/v1/logout"
      );
      console.log(res);
      navigate("/profile");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (e) {
      console.log(e);
    }
  };
  const searchsubmithandler = (e) => {
    e.preventDefault();

    const conversationUser = otherusers?.find((user) =>
      user.fullname.toLowerCase().includes(search.toLowerCase())
    );
    setSearch("");
    if (conversationUser) {
      dispatch(setotherusers([conversationUser]));

      timer();
    } else toast.error("User not found");
  };

  return (
    <div className="border-r border-slate-500   p-4 flex flex-col ">
      <form
        onSubmit={searchsubmithandler}
        className="flex items-center gap-2"
        action=""
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md w-full max-w-md"
          type="text"
          placeholder="Search....."
        />
        <button type="submit" className="btn    text-white  bg-zinc-700">
          <BiSearchAlt2 size={"24px"} className="w-6 h-6  outline-none" />
        </button>
      </form>
      <div className="divider  px-3"></div>
      <Otherusers></Otherusers>
      <div className="mt-2">
        <button onClick={logouthandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
