const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({ email, username, password });
    res
      .status(201)
      .json({ message: "User signed up successfully", success: true, user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    const user = await User.findOne({ email: email }); 
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials!" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const accessToken = jwt.sign(
      { UserInfo: { user: user._id } },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    

    res.json({ accessToken, email: user.email });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
};
