const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const cookieOptions = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

async function registerUser(req, res) {
  try {
    const { name, username, password } = req.body;

  const existingUser = await userModel.findOne({
    username,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "user already exists",
    });
  }

  const user = await userModel.create({
    name,
    username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("AuthToken", token, cookieOptions);

  const safeUser = { _id: user._id, name: user.name, username: user.username };

  res.status(201).json({
    message: "user created successfully!",
    user: safeUser,
  });
  }
  catch (err) {
    console.error('Register error:', err);
    res.status(500).json({
      message: 'Server error'
    });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "invalid credentials",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("AuthToken", token, cookieOptions);

  const safeUser = { _id: user._id, name: user.name, username: user.username };

  res.status(200).json({
    message: "login successful",
    user: safeUser,
  });
  } catch (error) {
    console.error('Login error:', err);
    res.status(500).json({
      message: 'Server error'
    })
  }
}

module.exports = { registerUser, loginUser };
