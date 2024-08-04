import React from "react";
import { setselecteduser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Otheruser = (props) => {
  const user = props.user;

  const dispatch = useDispatch();

  const { selectedUser, onlineusers } = useSelector((store) => store.user);

  const isonline = onlineusers?.includes(user._id);

  const selecteduserhandler = () => {
    dispatch(setselecteduser(user));
  };

  return (
    <>
      <div
        onClick={selecteduserhandler}
        className={`${
          selectedUser?._id == user?._id ? "bg-zinc-200 text-black" : ""
        }  flex gap-2 items-center text-white  hover:text-zinc-900 hover:bg-zinc-200 rounded-sm p-2  cursor-pointer`}
      >
        <div className={`avatar ${isonline ? "online" : ""}  `}>
          <div className="w-12  rounded-full ">
            <img src={user?.profilePhoto} alt="profile" />
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <p>{user?.fullname}</p>
        </div>
      </div>
      <div className="divider my-0 py-0"></div>
    </>
  );
};

export default Otheruser;
