import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";
import { useState } from "react";
import { today, tomorrow, nextWeek, nextMonth } from "../../../../Others/Dates";
import "./Tasks.css";

const Tasks = (props) => {
  const [filteredDate, setFilteredDate] = useState("all");
  const [filteredStatus, setFilteredStatus] = useState("all");

  const dateChangeHandler = (dateOption) => {
    setFilteredDate(dateOption);
  };

  const statusChangeHandler = (statusOption) => {
    setFilteredStatus(statusOption);
  }

  let filtered;
  let finalFiltered;

  switch (filteredStatus) {
    case "all":
      filtered = props.tasks;
      break;
    case "completed":
      filtered = props.tasks.filter((task) => task.completed === true);
      break;
    case "not completed":
      filtered = props.tasks.filter((task) => task.completed === false);
      break;
    default:
      break;
  }

  switch (filteredDate) {
    case "all":
      finalFiltered = filtered;
      break;
    case "today":
      finalFiltered = filtered.filter(
        (task) =>
          new Date(task.date) <= new Date(today) &&
          new Date(task.date) >= new Date(today)
      );
      break;
    case "tomorrow":
      finalFiltered = filtered.filter(
        (task) =>
          new Date(today) <= new Date(task.date) &&
          new Date(task.date) <= new Date(tomorrow)
      );
      break;
    case "week":
      finalFiltered = filtered.filter(
        (task) =>
          new Date(today) <= new Date(task.date) &&
          new Date(task.date) <= new Date(nextWeek)
      );
      break;
    case "month":
      finalFiltered = filtered.filter(
        (task) =>
          new Date(today) <= new Date(task.date) &&
          new Date(task.date) <= new Date(nextMonth)
      );
      break;
    case "overdue":
      finalFiltered = filtered.filter(
        (task) => new Date(today) > new Date(task.date)
      );
    default:
      break;
  }

  const sortedList = finalFiltered.sort((a, b) => a.date - b.date);

  return (
    <div className="tasks">
      <TaskFilter
        selected={filteredDate}
        onDateChange={dateChangeHandler}
        selectedStatus={filteredStatus}
        onStatusChange={statusChangeHandler}
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
