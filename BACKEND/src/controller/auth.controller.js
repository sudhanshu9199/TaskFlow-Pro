const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const imagekit = require('../service/imagekit.js')

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

    const safeUser = {
      _id: user._id,
      name: user.name,
      username: user.username,
    };

    res.status(201).json({
      message: "user created successfully!",
      user: safeUser,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({
      message: "Server error",
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

    const safeUser = {
      _id: user._id,
      name: user.name,
      username: user.username,
    };

    res.status(200).json({
      message: "login successful",
      user: safeUser,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function updateUser(req, res) {
  try {
    const { name, password } = req.body;
    const updates = {};

    if (name) updates.name = name;
    if (password) updates.password = await bcrypt.hash(password, 10);

    if (req.file) {
      try {
        const uploadResponse = await imagekit.upload({
          file: req.file.buffer,
          fileName: `profile-${req.user._id}-${Date.now()}`,
          folder: '/taskflow-profiles',
        });
        updates.profileImage = uploadResponse.url;
      } catch (uploadError) {
        console.error('ImageKit Upload Error:', uploadError);
        return res.status(500).json({
          message: 'Failed to upload image'
        })
      }
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(req.user._id, updates, { new: true })
      .select("-password");

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
}

async function deleteUser(req, res) {
  try {
    await userModel.findByIdAndDelete(req.user._id);
    res.clearCookie("AuthToken");
    res.json({
      message: "Account deleted successfully",
    });
  } catch (err) {
    console.error("Delete account error:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
}
module.exports = { registerUser, loginUser, updateUser, deleteUser };
