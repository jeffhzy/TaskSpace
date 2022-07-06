import "./FrontPage.css";
import NewTask from "../Components/ToDoList/NewTask/NewTask";
import Tasks from "../Components/ToDoList/Tasks/Tasks";
import { useState, useEffect } from "react";
import Timer from "../Components/Timer/Timer";
import { useAuth } from "../Hooks/useAuth";
import { db } from "../Config/firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

const FrontPage = (props) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    const getTasks = async () => {
      const Data = await getDoc(doc(db, "users", user.uid));
      setTasks(Data.data().tasks);
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
  };

  const updateTaskHandler = (taskId, newtitle, newdate) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { id: taskId, title: newtitle, date: newdate }
          : task
      )
    );
  };

  const convertTaskList = (tasklist) => {
    return tasklist
      ? tasklist.map((task) =>
          true
            ? { id: task.id, title: task.title, date: new Date(task.date) }
            : {}
        )
      : tasklist;
  };

  //to add to-do list data to database
  useEffect(() => {
    const addTasks = async () => {
      await setDoc(doc(db, "users", user.uid), { tasks }, { merge: true });
    };
    if (renderCount > 1) {
      setRenderCount(renderCount + 1);
      addTasks();
    } else {
      setRenderCount(renderCount + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  return (
    <div>
      <Timer setPointHandler={props.changeExp} />
      <NewTask onAddTask={addTaskHandler}></NewTask>
      <Tasks
        tasks={convertTaskList(tasks)}
        deleteHandler={deleteTaskHandler}
        updateHandler={updateTaskHandler}
      />
    </div>
  );
};

export default FrontPage;
