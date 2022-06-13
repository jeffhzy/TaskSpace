import NewTask from "../Components/ToDoList/NewTask/NewTask";
import Tasks from "../Components/ToDoList/Tasks/Tasks";
import { useState } from "react";

const DUMMY_TASKS = [
  { id: "a1", title: "Watch CS2030 Lecture", date: new Date(2022, 5, 14) },
  { id: "a2", title: "Finish MA1521 Assignment", date: new Date(2022, 5, 20) },
];

const FrontPage = () => {
  const [tasks, setTasks] = useState(DUMMY_TASKS);

  const addTaskHandler = (task) => {
    setTasks((prevTasks) => {
      return [task, ...prevTasks];
    });
  };

  return (
    <div>
      <div>
        <NewTask onAddTask={addTaskHandler}></NewTask>
        <Tasks tasks={tasks} />
      </div>
    </div>
  );
};

export default FrontPage;
