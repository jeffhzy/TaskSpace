import TaskDate from "./TaskDate";
import "./TaskItem.css"
import Checkbox from '@mui/material/Checkbox';
import TaskMenu from "./TaskMenu";
import EditTask from "./EditTask";
import { useState } from "react";

const TaskItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskDate, setTaskDate] = useState(props.date);
  const [taskTitle, setTaskTitle] = useState(props.title);

  const TaskEditingHandler = () => {
    setIsEditing(!isEditing);
  }

  const SubmitHandler = (newtitle, newdate) => {
    setTaskTitle(newtitle);
    setTaskDate(new Date(newdate));
    props.updateHandler(props.id, newtitle, new Date(newdate));
    TaskEditingHandler();
  }

  if (!isEditing) {
    return (
    <li className="task-item">
      <div>
        <TaskDate date={taskDate}></TaskDate>
      </div>
      <div className="task-item__description">
        <h2>{taskTitle}</h2>
        <Checkbox/>
        <TaskMenu id={props.id} deleteHandler={props.deleteHandler} editHandler={TaskEditingHandler}/>
      </div>
    </li>);
  } else {
    return (
       <EditTask title={taskTitle}  date={taskDate} cancelHandler={TaskEditingHandler} submitHandler={SubmitHandler}/>
    );
  };
};

export default TaskItem;
