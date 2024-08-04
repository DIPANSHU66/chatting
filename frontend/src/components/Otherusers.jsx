import React from "react";

import Otheruser from "./Otheruser";

import useGetOtherUsers from "../hooks/useGetOtherUsers";

import { useSelector } from "react-redux";

const Otherusers = () => {
  useGetOtherUsers();

  const { otherusers} = useSelector((store) => store.user);

  if (!otherusers) return;

  return (
    <div className="scroll-container  ">
      {otherusers?.map((user) => {
        return <Otheruser key={user._id} user={user} />;
      })}
    </div>
  );
};

export default Otherusers;
