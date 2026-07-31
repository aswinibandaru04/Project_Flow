import { useState, useEffect } from "react";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import Board from "../../components/board/Board";
import { getWorkspaces } from "../../services/workspaceService";
import { getProjects } from "../../services/projectService";
import { getTasks } from "../../services/taskService";
import "./KanBanBoard.css";

const BoardPage = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [projects, setProjects] = useState([]);

  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const [tasks, setTasks] = useState([]);

  // Load workspaces
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  // Load tasks whenever project changes
  useEffect(() => {
    fetchTasks();
  }, [selectedProject]);

  const fetchWorkspaces = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await getWorkspaces(token);

      setWorkspaces(data.workspaces);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProjects = async (workspaceId) => {
    try {
      const token = localStorage.getItem("token");

      const data = await getProjects(workspaceId, token);

      setProjects(data.projects);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTasks = async () => {
    if (!selectedProject) {
      setTasks([]);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      console.log("Selected Project:", selectedProject);

      const data = await getTasks(selectedProject, token);

      console.log("API Response:", data);

      setTasks(data.tasks || []);
    } catch (err) {
      console.log(err);
    }
  };

  const todo = tasks.filter(
    (task) => task.status === "Todo"
  );

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const done = tasks.filter(
    (task) => task.status === "Done"
  );

  console.log("Todo:", todo);
  console.log("Progress:", inProgress);
  console.log("Done:", done);

  return (
    <div className="board-container">
      <Sidebar />

      <div className="board-content">
        <Navbar />

        <div className="board-body">
          <div className="board-header">
            <h2>Kanban Board</h2>

            <div className="selectors">
              <select
                value={selectedWorkspace}
                onChange={(e) => {
                  setSelectedWorkspace(e.target.value);
                  setSelectedProject("");
                  fetchProjects(e.target.value);
                }}
              >
                <option value="">Select Workspace</option>

                {workspaces.map((workspace) => (
                  <option
                    key={workspace._id}
                    value={workspace._id}
                  >
                    {workspace.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedProject}
                onChange={(e) =>
                  setSelectedProject(e.target.value)
                }
              >
                <option value="">Select Project</option>

                {projects.map((project) => (
                  <option
                    key={project._id}
                    value={project._id}
                  >
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Board
            projectId={selectedProject}
            todo={todo}
            inProgress={inProgress}
            done={done}
          />
        </div>
      </div>
    </div>
  );
};

export default BoardPage;