import TaskItem from "./TaskItem";
import "./TaskList.css";

const TaskList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="task-list__fallback">No outstanding tasks.</h2>;
  }
  return (
    <ul className="task-list">
      {props.items.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          date={task.date}
          timeTaken={task.timeTaken}
          deleteHandler={props.deleteHandler}
          updateHandler={props.updateHandler}
          view={props.view}
        />
      ))}
    </ul>
  );
};

export default TaskList;
