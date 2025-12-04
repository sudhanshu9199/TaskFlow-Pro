const userModel = require("../models/userModel.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {
  const { username, password } = req.body;

  const existingUser = await userModel.findOne({
    username,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "user already exists",
    });
  }

  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign(
    {
        id: user._id,
    },
    process.env.JWT_SECRET,
  )

  res.cookie('AuthToken', token);

  res.status(201).json({
    message: "user created successfully!",
    user,
  });
}

async function loginUser(req, res) {
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
    res.cookie('AuthToken', token);

    res.status(200).json({
        message: "login successful",
        user,
    })
}

module.exports = { registerUser, loginUser };