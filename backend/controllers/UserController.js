const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const register = async (req, res) => {
  try {
    const { fullname, username, password, confirmpassword, gender,profilePhoto } = req.body;
    if (!fullname || !username || !password || !confirmpassword || !gender) {
      return res.status(400).json({ message: "All   fields are Required" });
    }
    if (password != confirmpassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "username exit try different" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      username,
      password: hashedpassword,
      profilePhoto,
      gender,
    });
    return res.status(201).json({
      message: "Account created Succesfully",
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are  required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect Username or Password",
        succes: false,
      });
    }
    const ispasswordmatch = await bcrypt.compare(password, user.password);
    if (!ispasswordmatch) {
      return res.status(400).json({
        message: "Incorrect Username or Password",
        succes: false,
      });
    }
    const tokendata = { userId: user._id };
    const token = await jwt.sign(tokendata, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        username: user.username,
        fullname: user.fullname,
        profilePhoto: user.profilePhoto,
      });
  } catch (e) {
    console.log(e);
  }
};

const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "user logged out succesfully.",
    });
  } catch (e) {
    console.log(e);
  }
};
const getotherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    return res.status(200).json(otherUsers);
  } catch (e) {
    console.log(e);
  }
};
module.exports = { register, login, logout, getotherUsers };
