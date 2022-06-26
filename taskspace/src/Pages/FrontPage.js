import "./FrontPage.css"
import NewTask from "../Components/ToDoList/NewTask/NewTask";
import Tasks from "../Components/ToDoList/Tasks/Tasks";
import { useState, useEffect } from "react";
import Timer from "../Components/Timer/Timer";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Header";
import { useAuth } from "../Hooks/useAuth";
import { db } from "../Config/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const FrontPage = () => {

  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [userProfile, setUserProfile] = useState("");
  const [renderCount, setRenderCount] = useState(0);

  //to get from database
  useEffect(() => { 
    const getTasks = async () => {
    const taskData = await getDoc(doc(db, "users", user.uid));
    if (taskData.data().tasks) {
    setTasks(taskData.data().tasks);
    };
    setUserProfile({name: (taskData.data().firstName+" "+taskData.data().lastName), level: 20, expVal: 153, expMax: 500});
    };
    getTasks();
  }, []);

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

 const convertTaskList = (tasklist) => {
    return tasklist ? tasklist.map((task) => true ? {id: task.id, title: task.title, date: new Date(task.date)}: {}) : tasklist;
  }
  //to add to database
  useEffect(() => {
    const addTasks = async () => {
      await setDoc(doc(db, "users", user.uid), {tasks}, {merge:true});
    };
    if (renderCount > 1) {
      setRenderCount(renderCount + 1);
      addTasks();
    } else {
      setRenderCount(renderCount + 1);
    }
  }, [tasks]);

  return (
    <div>
     <Header />
    <div className="pageOrientation">
      <Sidebar className="header-sidebar" values={userProfile}/>
      <div className="mainPart">
        <Timer />
        <NewTask onAddTask={addTaskHandler}></NewTask>
        <Tasks tasks={convertTaskList(tasks)} deleteHandler={deleteTaskHandler} updateHandler={updateTaskHandler}/>
      </div>
    </div>
    </div>
  );
};

export default FrontPage;
