import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Signup = () => {
  const { image } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: "",
    profilePhoto: "",
  });
  if (image == "")
    user.profilePhoto =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRneF6YlKoPHrVxJAnSHV5edlYqs0FSV8rIxA&s";
  else user.profilePhoto = image;

  const submithandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }

    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmpassword: "",
      gender: "",
      profilePhoto: "",
    });
  };

  return (
    <div className=" mx-auto">
      <div className="w-full  p-6  bg-gray-400  shadow-md  rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100  ">
        <h1 className="text-3xl font-bold text-center">Signup</h1>
        <form onSubmit={submithandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Full Name</span>
            </label>
            <input
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              className="w-full  input input-bordered h-10 "
              type="text"
              placeholder="Fullname "
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Username</span>
            </label>
            <input
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              value={user.username}
              className="w-full  input input-bordered h-10 "
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Password</span>
            </label>
            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              className="w-full  input input-bordered h-10 "
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Confirm Password</span>
            </label>
            <input
              onChange={(e) =>
                setUser({ ...user, confirmpassword: e.target.value })
              }
              value={user.confirmpassword}
              className="w-full  input input-bordered h-10 "
              type="password"
              placeholder="Confirm  Password"
            />
          </div>
          <div className="flex items-center  my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input
                checked={user.gender == "male"}
                onChange={() => setUser({ ...user, gender: "male" })}
                value={user.gender}
                type="checkbox"
                className="checkbox mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input
                checked={user.gender == "female"}
                onChange={() => setUser({ ...user, gender: "female" })}
                type="checkbox"
                className="checkbox mx-2"
              />
            </div>
          </div>
          <div className="w-full mx-auto flex items-center text-center">
            <Link to="/login">Already Have a account?Login</Link>
          </div>

          <div>
            <button
              type="submit"
              className="btn  btn-block btn-sm  mt-2 border border-slate-700"
            >
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
