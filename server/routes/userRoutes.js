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



// Optional: users of a workspace
router.get("/:workspaceId", protect, getUsers);
router.get("/", protect, getUsers);

module.exports = router;