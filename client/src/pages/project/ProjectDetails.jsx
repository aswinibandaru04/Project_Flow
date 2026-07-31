import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";

import "./ProjectDetails.css";

import { getProjectById } from "../../services/projectService";
import {
  createTask,
  getTasks,
  assignTask,
} from "../../services/taskService";
import { getUsers } from "../../services/userService";


const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);

  const [tasks, setTasks] = useState([]);

  const [users, setUsers] = useState([]);

const [selectedTask, setSelectedTask] = useState(null);

const [selectedUser, setSelectedUser] = useState("");

const [showAssignModal, setShowAssignModal] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
  });

  // ==========================
  // Fetch Project
  // ==========================

  const fetchProject = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await getProjectById(id, token);

      setProject(data.project);
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Fetch Tasks
  // ==========================

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await getTasks(id, token);

      setTasks(data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");

    const data = await getUsers(token);

    console.log(data.users); 

    setUsers(data.users);

  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    fetchProject();
    fetchTasks();
     fetchUsers();
  }, []);

  // ==========================
  // Handle Input
  // ==========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Create Task
  // ==========================

  const handleCreateTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await createTask(
        {
          ...formData,
          project: id,
        },
        token
      );

      fetchTasks();

      setShowModal(false);

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        status: "Todo",
      });

    } catch (err) {
      console.log(err);
    }
  };

  const handleAssign = async () => {
  try {

    const token = localStorage.getItem("token");

    await assignTask(
      selectedTask._id,
      selectedUser,
      token
    );

    fetchTasks();

    setShowAssignModal(false);

    setSelectedUser("");

    alert("Task Assigned Successfully");

  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="workspace-container">
      <Sidebar />

      <div className="workspace-content">
        <Navbar />

        <div className="workspace-body">

          {project && (
            <div className="project-info">

              <h2>{project.name}</h2>

              <p>{project.description}</p>

              <p>
                <strong>Workspace :</strong> {project.workspace?.name}
              </p>

              <p>
                <strong>Owner :</strong> {project.owner?.name}
              </p>

            </div>
          )}

          <div className="task-header">

            <h2>Tasks</h2>

            <button
              className="add-btn"
              onClick={() => setShowModal(true)}
            >
              + Add Task
            </button>

          </div>
          

          <div className="task-list">

            {tasks.length === 0 ? (

              <div className="task-card">

                <h3>No Tasks Yet</h3>

                <p>Create your first task.</p>

              </div>

            ) : (

              tasks.map((task) => (

                <div className="task-card" key={task._id}>

  <h3>{task.title}</h3>

  <p>{task.description}</p>

  <p>
    <strong>Status:</strong> {task.status}
  </p>

  <p>
    <strong>Priority:</strong> {task.priority}
  </p>

  <p>
    <strong>Assigned:</strong>{" "}
    {task.assignedTo ? task.assignedTo.name : "Not Assigned"}
  </p>

  <button
    className="assign-btn"
    onClick={() => {
      setSelectedTask(task);
      setShowAssignModal(true);
    }}
  >
    Assign User
  </button>

</div>

              ))

            )}

          </div>

          {showModal && (

            <div className="modal-overlay">

              <div className="modal">

                <h2>Create Task</h2>

                <input
                  type="text"
                  placeholder="Task Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />

                <textarea
                  placeholder="Task Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Todo</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>

                <div className="modal-buttons">

                  <button
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <button
                    className="create-btn"
                    onClick={handleCreateTask}
                  >
                    Create
                  </button>

                </div>

              </div>

            </div>

          )}
          {showAssignModal && (
  <div className="modal-overlay">
    <div className="modal">

      <h2>Assign Task</h2>

      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
      >
        <option value="">Select User</option>

        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name} ({user.role})
          </option>
        ))}
      </select>

      <div className="modal-buttons">

        <button
          className="cancel-btn"
          onClick={() => {
            setShowAssignModal(false);
            setSelectedUser("");
          }}
        >
          Cancel
        </button>

        <button
          className="create-btn"
          onClick={handleAssign}
        >
          Assign
        </button>

      </div>

    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;