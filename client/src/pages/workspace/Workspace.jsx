import { useState,useEffect } from "react";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import "./Workspace.css";
import { createWorkspace, getWorkspaces } from "../../services/workspaceService";
import { useNavigate } from "react-router-dom";

const Workspace = () => {
   const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
 

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

const handleCreate = async () => {
  console.log("Create button clicked");

  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    await createWorkspace(formData, token);

    await fetchWorkspaces();

    setFormData({
      name: "",
      description: "",
    });

    setShowModal(false);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {

    fetchWorkspaces();

}, []);

const fetchWorkspaces = async () => {

    try{

        const token = localStorage.getItem("token");

        const data = await getWorkspaces(token);

        setWorkspaces(data.workspaces);

    }

    catch(error){

        console.log(error);

    }

}

  return (
    <div className="workspace-container">
      <Sidebar />

      <div className="workspace-content">
        <Navbar />

        <div className="workspace-body">

          <div className="workspace-header">
            <h2>Workspaces</h2>

            <button
              className="add-btn"
              onClick={() => setShowModal(true)}
            >
              + Add Workspace
            </button>
          </div>

          <div className="workspace-list">
  {workspaces.length === 0 ? (
    <div className="workspace-card">
      <h3>No Workspace Yet</h3>
      <p>Create your first workspace.</p>
    </div>
  ) : (
    workspaces.map((workspace) => (
      <div
        className="workspace-card"
        key={workspace._id}
        onClick={() => navigate(`/workspace/${workspace._id}`)}
      >
        <h3>{workspace.name}</h3>
        <p>{workspace.description}</p>
      </div>
    ))
  )}
</div>

          {showModal && (
            <div className="modal-overlay">

              <div className="modal">

                <h2>Create Workspace</h2>

                <input
                  type="text"
                  placeholder="Workspace Name"
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

export default Workspace;