const express = require("express");
const router = express.Router();

const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");

const { protect } = require("../middleware/authMiddleware");

// Get all notifications
router.get("/", protect, getNotifications);

// Mark notification as read
router.patch("/:id/read", protect, markAsRead);

module.exports = router;