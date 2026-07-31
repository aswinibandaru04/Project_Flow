import { useEffect, useState } from "react";
import { getUsers } from "../../services/userService";
import "./InviteMembers.css";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/Sidebar";
import {
  getWorkspaces,
  inviteMember,
} from "../../services/workspaceService";


const InviteMembers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [workspaces, setWorkspaces] = useState([]);
const [selectedWorkspace, setSelectedWorkspace] = useState("");

  useEffect(() => {
  fetchUsers();
  fetchWorkspaces();
}, []);

const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const data = await getUsers(token);

    console.log("Users Response:", data);

    setUsers(data.users);
  } catch (err) {
    console.log(err);
  }
};

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleInvite = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await inviteMember(
  selectedWorkspace,
  userId,
  token
);
    alert(res.message);

    fetchUsers();

  } catch (err) {
    alert(err.response?.data?.message || "Something went wrong");
  }
};

const fetchWorkspaces = async () => {
  try {
    const token = localStorage.getItem("token");

    const data = await getWorkspaces(token);
    console.log(data.workspaces);

    console.log("Workspaces Response:", data);

    setWorkspaces(data.workspaces);

    if (data.workspaces.length > 0) {
      setSelectedWorkspace(data.workspaces[0]._id);
    }

  } catch (err) {
    console.log(err);
  }
};

return (
  <div className="dashboard-container">

    <Sidebar />

    <div className="dashboard-content">

      <Navbar />

      <div className="invite-container">

  <h2>Invite Members</h2>

  {/* Workspace Dropdown */}
  <div className="workspace-select">

    <label>Select Workspace</label>

    <select
      value={selectedWorkspace}
      onChange={(e) => setSelectedWorkspace(e.target.value)}
    >
      {workspaces.map((workspace) => (
        <option
          key={workspace._id}
          value={workspace._id}
        >
          {workspace.name}
        </option>
      ))}
    </select>

  </div>

  {/* Search Box */}
  <input
    type="text"
    placeholder="Search by name or email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="search-box"
  />


        <div className="user-list">
          {filteredUsers.map((user) => (
            <div className="user-card" key={user._id}>

              <div>
                <h4>{user.name}</h4>
                <p>{user.email}</p>
              </div>

              <button
    className="invite-btn"
    onClick={() => handleInvite(user._id)}
>
    Invite
</button>

            </div>
          ))}
        </div>


    </div>

  </div>
  </div>
);}

export default InviteMembers;