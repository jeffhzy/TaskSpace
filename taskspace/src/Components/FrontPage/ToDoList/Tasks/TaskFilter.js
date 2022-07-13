import "./TaskFilter.css"

const TaskFilter = (props) => {

  const changeDateHandler = (event) => {
    props.onDateChange(event.target.value);
  }

  return (
    <div className="task-filter">
      <div className="task-filter__control">
        <label>Filter by due date</label>
        <select value={props.selected}  onChange={changeDateHandler}>
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
