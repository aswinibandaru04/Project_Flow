import { useParams,useNavigate } from "react-router-dom";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import "./WorkspaceDetails.css";
import { getWorkspaceById } from "../../services/workspaceService";
import { useState, useEffect } from "react";
import { createProject, getProjects } from "../../services/projectService";

const WorkspaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState(null);
  const [showModal, setShowModal] = useState(false);

const [projects, setProjects] = useState([]);

const [formData, setFormData] = useState({
  name: "",
  description: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const fetchProjects = async () => {
  try {
    const token = localStorage.getItem("token");

    const data = await getProjects(id, token);

    setProjects(data.projects);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchProjects();
}, []);

const handleCreate = async () => {
  try {
    const token = localStorage.getItem("token");

    await createProject(
      {
        ...formData,
        workspace: id,
      },
      token
    );

    fetchProjects();

    setFormData({
      name: "",
      description: "",
    });

    setShowModal(false);
  } catch (err) {
    console.log(err);
  }
};
  

  useEffect(() => {
  fetchWorkspace();
}, []);

const fetchWorkspace = async () => {
  try {
    const token = localStorage.getItem("token");

    const data = await getWorkspaceById(id, token);

    console.log(data);   // Add this

    setWorkspace(data.workspace);
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
          {workspace && (
  <div className="workspace-info">
    <h2>{workspace.name}</h2>

    <p>{workspace.description}</p>

    <p>
      <strong>Owner:</strong> {workspace.owner?.name}
    </p>

    <p>
      <strong>Members:</strong> {workspace.members?.length}
    </p>
  </div>
)}
          <div className="project-header">

  <h2>Projects</h2>

  <button
    className="add-btn"
    onClick={() => setShowModal(true)}
  >
    + Add Project
  </button>

</div>

<div className="project-list">

  {projects.length === 0 ? (

    <div className="project-card">
      <h3>No Projects</h3>
      <p>Create your first project.</p>
    </div>

  ) : (

    projects.map((project) => (

      <div
        className="project-card"
        key={project._id}
         onClick={() => navigate(`/project/${project._id}`)}
      >

        <h3>{project.name}</h3>

        <p>{project.description}</p>

      </div>

    ))

  )}

</div>

{showModal && (

<div className="modal-overlay">

<div className="modal">

<h2>Create Project</h2>

<input
type="text"
placeholder="Project Name"
name="name"
value={formData.name}
onChange={handleChange}
/>

<textarea
placeholder="Description"
name="description"
value={formData.description}
onChange={handleChange}
/>

<div className="modal-buttons">

<button
className="cancel-btn"
onClick={() => setShowModal(false)}
>
Cancel
</button>

<button
className="create-btn"
onClick={handleCreate}
>
Create
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

export default WorkspaceDetails;