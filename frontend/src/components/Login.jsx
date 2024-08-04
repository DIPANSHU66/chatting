import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const onsubmithandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8000/api/v1/login`, user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      navigate("/homepage");
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setUser({
      username: "",
      password: "",
    });
  };
  return (
    <div className=" mx-auto">
      <div className="w-full  p-6  bg-gray-400  shadow-md  rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100  ">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={onsubmithandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text ">Username</span>
            </label>
            <input
              onChange={(e) => setUser({ ...user, username: e.target.value })}
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
              className="w-full  input input-bordered h-10 "
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="w-full mx-auto flex items-center text-center">
            <Link to="/register">Don't Have a account?Signup</Link>
          </div>

          <div>
            <button
              type="submit"
              className="btn  btn-block btn-sm  mt-2 border border-slate-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
