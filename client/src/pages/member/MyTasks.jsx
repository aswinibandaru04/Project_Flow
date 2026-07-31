import { useEffect, useState } from "react";
import Navbar from "../../components/dashboard/Navbar";
import MemberSidebar from "../../components/dashboard/MemberSidebar";
import { getMyTasks,changeTaskStatus } from "../../services/taskService";
import "./MyTasks.css";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchMyTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await getMyTasks(token);

      setTasks(data.tasks);

    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (taskId, status) => {
  try {

    const token = localStorage.getItem("token");

    await changeTaskStatus(taskId, status, token);

    fetchMyTasks();

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="member-container">

      <MemberSidebar />

      <div className="member-content">

        <Navbar />

        <div className="member-body">

          <h2>My Tasks</h2>

          <div className="task-list">

            {tasks.length === 0 ? (

              <h3>No Tasks Assigned</h3>

            ) : (

              tasks.map((task) => (

                <div className="task-card" key={task._id}>

  <h3>{task.title}</h3>

  <p>{task.description}</p>

  <p><strong>Project:</strong> {task.project?.name}</p>

  <p><strong>Priority:</strong> {task.priority}</p>

  <div className="status-section">
    <label>Status</label>

    <select
      className="status-dropdown"
      value={task.status}
      onChange={(e) =>
        updateStatus(task._id, e.target.value)
      }
    >
      <option value="Todo">📋 Todo</option>
      <option value="In Progress">🚀 In Progress</option>
      <option value="Done">✅ Done</option>
    </select>
  </div>

</div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default MyTasks;