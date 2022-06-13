import TaskItem from "./TaskItem";
import "./TaskList.css";

const TaskList = (props) => {
  return (
    <ul className="task-list">
      {props.items.map((task) => (
        <TaskItem key={task.id} title={task.title} date={task.date} />
      ))}
    </ul>
  );
};

export default TaskList;
