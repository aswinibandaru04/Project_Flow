const Project = require("../models/project");
const Workspace = require("../models/workspace");

// ======================
// CREATE PROJECT
// ======================

const createProject = async (req, res) => {

    try {

        const { name, description, workspace } = req.body;

        // Validate fields
        if (!name || !workspace) {
            return res.status(400).json({
                message: "Project name and workspace are required"
            });
        }

        // Check if workspace exists
        const existingWorkspace = await Workspace.findById(workspace);

        if (!existingWorkspace) {
            return res.status(404).json({
                message: "Workspace not found"
            });
        }

        // Create Project
        const project = await Project.create({

            name,
            description,
            workspace,
            owner: req.user.id

        });

        res.status(201).json({

            message: "Project created successfully",

            project

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ======================
// GET ALL PROJECTS OF A WORKSPACE
// ======================

const getProjects = async (req, res) => {

    try {

        const { workspaceId } = req.params;

        const projects = await Project.find({
            workspace: workspaceId
        })
        .populate("owner", "name email")
        .populate("workspace", "name");

        res.status(200).json({

            message: "Projects fetched successfully",

            count: projects.length,

            projects

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

// ======================
// GET SINGLE PROJECT
// ======================

const getProjectById = async (req, res) => {

    try {

        const { id } = req.params;

        const project = await Project.findById(id)
            .populate("workspace", "name description")
            .populate("owner", "name email");

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json({
            message: "Project fetched successfully",
            project
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

// ======================
// UPDATE PROJECT
// ======================

const updateProject = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, description } = req.body;

        // Find Project
        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // Update fields
        project.name = name || project.name;
        project.description = description || project.description;

        // Save updated project
        await project.save();

        res.status(200).json({
            message: "Project updated successfully",
            project
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ======================
// DELETE PROJECT
// ======================

const deleteProject = async (req, res) => {

    try {

        const { id } = req.params;

        const project = await Project.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        await project.deleteOne();

        res.status(200).json({
            message: "Project deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {

    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject

};