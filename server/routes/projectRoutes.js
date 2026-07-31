const express = require("express");
const router = express.Router();

const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
} = require("../controllers/projectController");

const { protect,authorize } = require("../middleware/authMiddleware");

// Create Project
router.post("/", protect, authorize("Admin", "Manager"), createProject);
router.get("/workspace/:workspaceId", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.put("/:id", protect, authorize("Admin", "Manager"), updateProject);
router.delete("/:id", protect, authorize("Admin", "Manager"), deleteProject);

module.exports = router;