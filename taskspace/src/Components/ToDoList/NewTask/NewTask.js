import TaskForm from "./TaskForm";
import "./NewTask.css";
import { useState } from "react";

const NewTask = (props) => {
  const [isAdding, setIsAdding] = useState(false);

  const saveTaskDataHandler = (enteredTaskData) => {
    const taskData = {
      ...enteredTaskData,
      id: Math.random().toString(),
    };
    props.onAddTask(taskData);
  };

  const startAddingHandler = () => {
    setIsAdding(true);
  };

  const stopAddingHandler = () => {
    setIsAdding(false);
  };

  return (
    <div className="new-task">
      {!isAdding && (
        <button onClick={startAddingHandler}>Add New Task</button>
      )}
      {isAdding && (
        <TaskForm
          onSaveTaskData={saveTaskDataHandler}
          onCancel={stopAddingHandler}
        />
      )}
    </div>
  );
};

export default NewTask;
