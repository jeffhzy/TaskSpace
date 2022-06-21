import "./FrontPage.css"
import NewTask from "../Components/ToDoList/NewTask/NewTask";
import Tasks from "../Components/ToDoList/Tasks/Tasks";
import { useState } from "react";
import Timer from "../Components/Timer/Timer";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Header";

const DUMMY_TASKS = [
  { id: "a1", title: "Watch CS2030 Lecture", date: new Date(2022, 5, 14) },
  { id: "a2", title: "Finish MA1521 Assignment", date: new Date(2022, 5, 20) },
];

const TESTPROFILEVALUES = {name: "Taskspace User", level: 20, expVal: 153, expMax: 500};

const FrontPage = () => {
  const [tasks, setTasks] = useState(DUMMY_TASKS);

  const addTaskHandler = (task) => {
    setTasks((prevTasks) => {
      return [task, ...prevTasks];
    });
  };

  return (
    <div>
     <Header />
    <div className="pageOrientation">
      <Sidebar values={TESTPROFILEVALUES}/>
      <div className="mainPart">
        <Timer />
        <NewTask onAddTask={addTaskHandler}></NewTask>
        <Tasks tasks={tasks} />
      </div>
    </div>
    </div>
  );
};

export default FrontPage;
