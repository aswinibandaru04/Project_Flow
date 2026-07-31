const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/taskController");
const { protect,authorize } = require("../middleware/authMiddleware");

// Create Task
router.post("/", protect, authorize("Admin", "Manager"), createTask);
router.get("/project/:projectId", protect, getTasks);
router.get("/member-dashboard", protect, getMemberDashboardStats);
router.get(
  "/my-tasks",
  protect,
  authorize("Member"),
  getMyTasks,
);
router.get("/:id", protect, getTask);
router.put("/:id", protect, authorize("Admin", "Manager"), updateTask);
router.delete("/:id", protect, authorize("Admin", "Manager"), deleteTask);
router.put("/:id/assign", protect, authorize("Admin", "Manager"), assignTask);
router.patch("/:id/status", protect, changeTaskStatus);
router.patch("/:id/priority", protect, authorize("Admin", "Manager"), setTaskPriority);
router.patch("/:id/due-date", protect, authorize("Admin", "Manager"), setDueDate);


module.exports = router;