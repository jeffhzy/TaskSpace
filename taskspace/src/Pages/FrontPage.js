import "./FrontPage.css";
import NewTask from "../Components/FrontPage/ToDoList/NewTask/NewTask";
import Tasks from "../Components/FrontPage/ToDoList/Tasks/Tasks";
import { useState, useEffect } from "react";
import Timer from "../Components/FrontPage/Timer/Timer";
import { useAuth } from "../Hooks/useAuth";
import { db } from "../Config/firebaseConfig";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

const FrontPage = (props) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    const getTasks = async () => {
      onSnapshot(doc(db, "users", user.uid), (document) => {
        setTasks(document.data().tasks);
      });
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

  const updateTaskHandler = (
    taskId,
    newtitle,
    newdate,
    taskCompleted,
    timeTaken
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              id: taskId,
              title: newtitle,
              date: newdate,
              completed: taskCompleted,
              timeTaken: timeTaken,
            }
          : task
      )
    );
  };

  const convertTaskList = (tasklist) => {
    return tasklist
      ? tasklist.map((task) =>
          true
            ? {
                id: task.id,
                title: task.title,
                date: new Date(task.date),
                completed: task.completed,
                timeTaken: task.timeTaken,
              }
            : {}
        )
      : tasklist;
  };

  const recordTimeHandler = async (time, selectedTask) => {
    const tempTasks = [];
    if (selectedTask !== null) {
      let newTask;
      for (const num in tasks) {
        const task = tasks[num];
        if (task.title == selectedTask) {
          const newTimeTaken = task.timeTaken + time;
          newTask = { ...task, timeTaken: newTimeTaken };
          tempTasks.push(newTask);
        } else {
          tempTasks.push(task);
        }
      }
      await updateDoc(doc(db, "users", user.uid), { tasks: tempTasks });
    }
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
      <Timer
        setPointHandler={props.changeExp}
        onRecordTime={recordTimeHandler}
      />
      <NewTask onAddTask={addTaskHandler} />
      <Tasks
        tasks={convertTaskList(tasks)}
        deleteHandler={deleteTaskHandler}
        updateHandler={updateTaskHandler}
        view={false}
      />
    </div>
  );
};

export default FrontPage;
