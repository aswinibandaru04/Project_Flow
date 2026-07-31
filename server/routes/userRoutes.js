const express = require("express");
const router = express.Router();

const {
  getUsers,
  getProfile,
  updateProfile,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// Profile
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

// Get all users
router.get("/", protect, getUsers);

// Optional: users of a workspace
router.get("/:workspaceId", protect, getUsers);

module.exports = router;