import "./EditTask.css";
import { useState } from "react";
import { today } from "../../../../Others/Dates";

const EditTask = (props) => {
  function toLocalISOString(d) {
    var off = d.getTimezoneOffset();
    return new Date(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      d.getMinutes() - off,
      d.getSeconds(),
      d.getMilliseconds()
    ).toISOString();
  }

  const originalDate = toLocalISOString(props.date).split("T")[0];
  const [enteredTask, setEnteredTask] = useState(props.title.toString());
  const [enteredDate, setEnteredDate] = useState(originalDate);
  const [isValid, setIsValid] = useState(true);

  const taskChangeHandler = (event) => {
    setEnteredTask(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = () => {
    props.submitHandler(enteredTask, enteredDate);
    setEnteredTask("");
    setEnteredDate("");
  };

  const validSubmitHandler = (event) => {
    event.preventDefault();
    if (!(enteredTask !== "" && enteredDate !== "")) {
      setIsValid(false);
    } else {
      setIsValid(true);
      submitHandler();
    }
  };

  return (
    <form onSubmit={validSubmitHandler} className="edit-task-container">
      <div className="edit-task-inputsContainer">
        <div className="edit-task-input">
          <label>Edit Task</label>
          <input type="text" value={enteredTask} onChange={taskChangeHandler} />
        </div>
        <div className="edit-task-input">
          <label>Edit Due By</label>
          <input
            type="date"
            value={enteredDate}
            min={originalDate < today ? originalDate : today}
            onChange={dateChangeHandler}
          ></input>
        </div>
      </div>
      <div className="edit-task__actions">
        {isValid !== true ? (
          <label>*Missing fields: Please fill in missing data</label>
        ) : (
          <></>
        )}
        <button type="button" onClick={props.cancelHandler}>
          Cancel
        </button>
        <button type="submit">Set Task</button>
      </div>
    </form>
  );
};

export default EditTask;
