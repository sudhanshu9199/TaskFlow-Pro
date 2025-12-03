const userModel = require("../models/userModel.js");

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
    password,
  });

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
}

module.exports = { registerUser };