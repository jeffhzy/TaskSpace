import TaskItem from "./TaskItem";
import "./TaskList.css";

const TaskList = (props) => {
  return (
    <ul className="task-list">
      {props.items.map((task) => (
        <TaskItem key={task.id} id={task.id} title={task.title} date={task.date} deleteHandler={props.deleteHandler} updateHandler={props.updateHandler}/>
      ))}
    </ul>
  );
};

export default TaskList;
