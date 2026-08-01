const User = require("../models/user");



const getUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      "name email role avatar"
    );

    res.status(200).json({
      message: "Users fetched successfully",
      count: users.length,
      users,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { name, email, skills } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.skills = skills || user.skills;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  getProfile,
  updateProfile
};