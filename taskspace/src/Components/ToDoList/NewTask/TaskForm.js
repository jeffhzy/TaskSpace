import { useState } from "react";
import "./TaskForm.css";
import {today} from "../../../Others/Dates";

const TaskForm = (props) => {
  const [enteredTask, setEnteredTask] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const taskChangeHandler = (event) => {
    setEnteredTask(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const taskData = {
      title: enteredTask,
      date: new Date(enteredDate),
    };

    props.onSaveTaskData(taskData);

    setEnteredTask("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-task__controls">
        <div className="new-task__control">
          <label>Task</label>
          <input type="text" value={enteredTask} onChange={taskChangeHandler} />
        </div>
        <div className="new-task__control">
          <label>Due By</label>
          <input
            type="date"
            min={today}
            value={enteredDate}
            onChange={dateChangeHandler}
          ></input>
        </div>
      </div>
      <div className="new-task__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Add Task</button>
      </div>
    </form>
  );
};

export default TaskForm;
