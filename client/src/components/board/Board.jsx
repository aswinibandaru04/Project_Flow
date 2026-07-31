import "./Board.css";

const Board = ({
  projectId,
  todo = [],
  inProgress = [],
  done = [],
}) => {
 

const isMemberBoard =
  !projectId &&
  (todo.length > 0 ||
    inProgress.length > 0 ||
    done.length > 0);

if (!projectId && !isMemberBoard) {
  return (
    <h2
      style={{
        textAlign: "center",
        marginTop: "120px",
        color: "#888",
      }}
    >
      Select a project to view the board
    </h2>
  );
}

  const renderCards = (tasks) => {
    if (tasks.length === 0) {
      return <p className="empty-column">No Tasks</p>;
    }

    return tasks.map((task) => (
      <div className="kanban-card" key={task._id}>
        <h4>{task.title}</h4>

        <p>{task.description}</p>

        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>
    ));
  };

  return (
    <div className="kanban-board">

      <div className="kanban-column">
        <div className="column-header todo">
          <h3>📋 Todo</h3>
        </div>

        <div className="column-body">
          {renderCards(todo)}
        </div>
      </div>

      <div className="kanban-column">
        <div className="column-header progress">
          <h3>🚀 In Progress</h3>
        </div>

        <div className="column-body">
          {renderCards(inProgress)}
        </div>
      </div>

      <div className="kanban-column">
        <div className="column-header done">
          <h3>✅ Done</h3>
        </div>

        <div className="column-body">
          {renderCards(done)}
        </div>
      </div>

    </div>
  );
};

export default Board;