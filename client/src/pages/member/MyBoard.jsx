import { useEffect, useState } from "react";
import Navbar from "../../components/dashboard/Navbar";
//import Sidebar from "../../components/dashboard/Sidebar";
import MemberSidebar from "../../components/dashboard/MemberSidebar";
import Board from "../../components/board/Board";
import { getMyTasks } from "../../services/taskService";
import "./MyBoard.css";

const MyBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchMyTasks();
  }, []);

  const fetchMyTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const data = await getMyTasks(token);

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

  return (
    <div className="myboard-container">
      <MemberSidebar />

      <div className="myboard-content">
        <Navbar />

        <div className="myboard-body">

          <div className="myboard-header">
            <h2>My Board</h2>
          </div>

       

          <Board
            todo={todo}
            inProgress={inProgress}
            done={done}
          />

        </div>
      </div>
    </div>
  );
};

export default MyBoard;