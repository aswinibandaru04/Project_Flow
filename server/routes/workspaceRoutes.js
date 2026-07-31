const express = require("express");
const router = express.Router();

const {
    createWorkspace,
    getAllWorkspaces,
    getWorkspaceById,
    updateWorkspace,
    deleteWorkspace,
    inviteMember
} = require("../controllers/workspaceController");

const { protect, authorize } = require("../middleware/authMiddleware");
// Create Workspace
router.post("/", protect, authorize("Admin"), createWorkspace);
router.get("/", protect, getAllWorkspaces);
router.put("/:id/invite",protect,authorize("Admin"),inviteMember);
router.get("/:id", protect, getWorkspaceById);
router.put("/:id", protect, authorize("Admin"), updateWorkspace);
router.delete("/:id", protect, authorize("Admin"), deleteWorkspace);

module.exports = router;