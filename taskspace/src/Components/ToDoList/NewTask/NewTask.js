import TaskForm from "./TaskForm";
import "./NewTask.css";
import { useState } from "react";

const NewTask = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveTaskDataHandler = (enteredTaskData) => {
    const taskData = {
      ...enteredTaskData,
      id: Math.random().toString(),
    };
    props.onAddTask(taskData);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="new-task">
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Task</button>
      )}
      {isEditing && (
        <TaskForm
          onSaveTaskData={saveTaskDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewTask;
