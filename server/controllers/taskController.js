const Task = require("../models/task");
const Project = require("../models/project");
const Notification = require("../models/Notification");
// Create Task
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, project, assignedTo } = req.body;

    // Check if project exists
    const projectExists = await Project.findById(project);

    if (!projectExists) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      project,
      assignedTo,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all tasks of a project
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

      console.log("Project ID:", req.params.projectId);
console.log("Tasks Found:", tasks);

    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Task
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .populate("project", "name");

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task fetched successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Only the creator can update the task
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to update this task",
      });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.assignedTo = assignedTo || task.assignedTo;

    await task.save();

    res.status(200).json({
      message: "Task updated successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Only the creator can delete the task
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not authorized to delete this task",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Assign Task
const assignTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedTo } = req.body;

    // Find task
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Check if user exists
    const User = require("../models/user");

    const user = await User.findById(assignedTo);

    if (!user) {
      return res.status(404).json({
        message: "Assigned user not found",
      });
    }

    // Assign task
    task.assignedTo = assignedTo;
   await task.save();

console.log("Task Assigned To:", assignedTo);

await Notification.create({
    user: assignedTo,
    title: "New Task Assigned",
    message: `You have been assigned the task "${task.title}"`,
    type: "Task",
});

console.log("Notification Created");

    res.status(200).json({
      message: "Task assigned successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Change Task Status
const changeTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatus = ["Todo", "In Progress", "Done"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid task status",
      });
    }

    const task = await Task.findById(id);

    if (
  req.user.role === "Member" &&
  task.assignedTo.toString() !== req.user.id
) {
  return res.status(403).json({
    message: "You can only update your own tasks",
  });
}

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json({
      message: "Task status updated successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Set Task Priority
const setTaskPriority = async (req, res) => {
  try {
    const { id } = req.params;
    const { priority } = req.body;

    const validPriorities = ["Low", "Medium", "High"];

    if (!validPriorities.includes(priority)) {
      return res.status(400).json({
        message: "Invalid priority",
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.priority = priority;

    await task.save();

    res.status(200).json({
      message: "Task priority updated successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Set Due Date
const setDueDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { dueDate } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.dueDate = dueDate;

    await task.save();

    res.status(200).json({
      message: "Due date updated successfully",
      task,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged-in Member Tasks
const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id,
    })
      .populate("project", "name")
      .populate("createdBy", "name email");

    res.status(200).json({
      message: "My tasks fetched successfully",
      tasks,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMemberDashboardStats = async (req, res) => {
  try {
    const assignedTasks = await Task.countDocuments({
      assignedTo: req.user.id,
    });

    const completedTasks = await Task.countDocuments({
      assignedTo: req.user.id,
      status: "Done",
    });

    const pendingTasks = await Task.countDocuments({
      assignedTo: req.user.id,
      status: { $ne: "Done" },
    });

    res.status(200).json({
      assignedTasks,
      completedTasks,
      pendingTasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  assignTask,
  changeTaskStatus,
  setTaskPriority,
  setDueDate,
  getMyTasks,
  getMemberDashboardStats
};