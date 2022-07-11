import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";
import { useState } from "react";
import { today, tomorrow, nextWeek, nextMonth } from "../../../../Others/Dates";
import "./Tasks.css";

const Tasks = (props) => {
  const [filteredDate, setFilteredDate] = useState("all");

  const dateChangeHandler = (dateOption) => {
    setFilteredDate(dateOption);
  };

  let filtered;

  switch (filteredDate) {
    case "all":
      filtered = props.tasks;
      break;
    case "today":
      filtered = props.tasks.filter(
        (task) => new Date(task.date) <= new Date(today)
      );
      break;
    case "tomorrow":
      filtered = props.tasks.filter(
        (task) => new Date(task.date) <= new Date(tomorrow)
      );
      break;
    case "week":
      filtered = props.tasks.filter(
        (task) => new Date(task.date) <= new Date(nextWeek)
      );
      break;
    case "month":
      filtered = props.tasks.filter(
        (task) => new Date(task.date) <= new Date(nextMonth)
      );
      break;
    default:
      break;
  }

  const sortedList = filtered.sort((a, b) => a.date - b.date);

  return (
    <div className="tasks">
      <TaskFilter
        selected={filteredDate}
        onDateChange={dateChangeHandler}
      ></TaskFilter>
      <TaskList
        items={sortedList}
        deleteHandler={props.deleteHandler}
        updateHandler={props.updateHandler}
        view={props.view}
      />
    </div>
  );
};

export default Tasks;
