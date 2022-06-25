import "./FrontPage.css"
import NewTask from "../Components/ToDoList/NewTask/NewTask";
import Tasks from "../Components/ToDoList/Tasks/Tasks";
import { useState } from "react";
import Timer from "../Components/Timer/Timer";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Header";

const DUMMY_TASKS = [];

const TESTPROFILEVALUES = {name: "Taskspace User", level: 20, expVal: 153, expMax: 500};

const FrontPage = () => {
  const [tasks, setTasks] = useState(DUMMY_TASKS);

  const addTaskHandler = (task) => {
    setTasks((prevTasks) => {
      return [task, ...prevTasks];
    });
  };

  const deleteTaskHandler = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId.id));
  }

  const updateTaskHandler = (taskId, newtitle, newdate) => {
    setTasks(tasks.map((task) => task.id === taskId ? {id: taskId, title: newtitle, date: newdate} : task));
  }

  return (
    <div>
     <Header />
    <div className="pageOrientation">
      <Sidebar className="header-sidebar" values={TESTPROFILEVALUES}/>
      <div className="mainPart">
        <Timer />
        <NewTask onAddTask={addTaskHandler}></NewTask>
        <Tasks tasks={tasks} deleteHandler={deleteTaskHandler} updateHandler={updateTaskHandler}/>
      </div>
    </div>
    </div>
  );
};

export default FrontPage;
