const Workspace = require("../models/workspace");

// ===============================
// CREATE WORKSPACE
// ===============================

const createWorkspace = async (req, res) => {

    try {

        // Get data from request body
        const { name, description } = req.body;

        // Check if workspace name is provided
        if (!name) {
            return res.status(400).json({
                message: "Workspace name is required"
            });
        }

        console.log("Body:", req.body);
console.log("User:", req.user);

        // Create workspace
        const workspace = await Workspace.create({

            name,
            description,

            // Logged-in user's ID from JWT middleware
            owner: req.user.id,

            // Add owner as the first member
            members: [
  {
    user: req.user.id,
  },
],

        });

        res.status(201).json({

            message: "Workspace created successfully",

            workspace

        });

    }

    catch (error) {
    console.error("CREATE WORKSPACE ERROR:");
    console.error(error);

    res.status(500).json({
        message: error.message
    });
}

};

// ===============================
// GET ALL WORKSPACES
// ===============================

const getAllWorkspaces = async (req, res) => {

    try {

        const workspaces = await Workspace.find({

            "members.user": req.user.id

        })
        .populate("owner", "name email")
        .populate("members.user", "name email");

        res.status(200).json({

            message: "Workspaces fetched successfully",

            count: workspaces.length,

            workspaces

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// GET WORKSPACE BY ID
// ===============================

const getWorkspaceById = async (req, res) => {

    try {

        const workspace = await Workspace.findById(req.params.id)
            .populate("owner", "name email")
.populate("members.user", "name email");

        if (!workspace) {
            return res.status(404).json({
                message: "Workspace not found"
            });
        }

        res.status(200).json({

            message: "Workspace fetched successfully",

            workspace

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// UPDATE WORKSPACE
// ===============================

const updateWorkspace = async (req, res) => {

    try {

        const { name, description } = req.body;

         const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({
                message: "Workspace not found"
            });
        }
        


        if (workspace.owner.toString() !== req.user.id) {
    return res.status(403).json({
        message: "You are not authorized to update this workspace"
    });
        }

        // Update fields only if new values are provided
        workspace.name = name || workspace.name;
        workspace.description = description || workspace.description;

        await workspace.save();

        res.status(200).json({

            message: "Workspace updated successfully",

            workspace

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// DELETE WORKSPACE
// ===============================

const deleteWorkspace = async (req, res) => {

    try {

        const workspace = await Workspace.findById(req.params.id);

        if (workspace.owner.toString() !== req.user.id) {
    return res.status(403).json({
        message: "You are not authorized to delete this workspace"
    });
}

        if (!workspace) {
            return res.status(404).json({
                message: "Workspace not found"
            });
        }

        if (workspace.owner.toString() !== req.user.id) {
    return res.status(403).json({
        message: "You are not authorized to delete this workspace"
    });
}

        await workspace.deleteOne();

        res.status(200).json({

            message: "Workspace deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ===============================
// INVITE MEMBER
// ===============================
const inviteMember = async (req, res) => {
  try {
    const { id } = req.params;      // Workspace ID
    const { userId } = req.body;    // User to invite

    const workspace = await Workspace.findById(id);

    if (!workspace) {
      return res.status(404).json({
        message: "Workspace not found",
      });
    }

    // Only owner can invite
    if (workspace.owner.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Only workspace owner can invite members",
      });
    }

    // Check if already a member
    const alreadyMember = workspace.members.some(
      (member) => member.user.toString() === userId
    );

    if (alreadyMember) {
      return res.status(400).json({
        message: "User is already a member",
      });
    }

    // Add member
    workspace.members.push({
      user: userId,
    });

    await workspace.save();

    res.status(200).json({
      message: "Member invited successfully",
      workspace,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
    createWorkspace,
    getAllWorkspaces,
    getWorkspaceById,
    updateWorkspace,
    deleteWorkspace,
    inviteMember
};