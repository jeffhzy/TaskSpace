import TaskDate from "./TaskDate";
import "./TaskItem.css"
import Checkbox from '@mui/material/Checkbox';

const TaskItem = (props) => {
  return (
    <li className="task-item">
      <div>
        <TaskDate date={props.date}></TaskDate>
      </div>
      <div className="task-item__description">
        <h2>{props.title}</h2>
        <Checkbox/>
      </div>
    </li>
  );
};

export default TaskItem;
