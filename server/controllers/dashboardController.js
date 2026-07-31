const User = require("../models/user");
const Workspace = require("../models/workspace");
const Project = require("../models/project");
const Task = require("../models/task");

const getDashboardStats = async (req, res) => {
  try {
    const users = await User.countDocuments();

    const projects = await Project.countDocuments();

    const tasks = await Task.countDocuments();

    const workspaces = await Workspace.countDocuments();

    res.status(200).json({
      users,
      projects,
      tasks,
      workspaces,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};