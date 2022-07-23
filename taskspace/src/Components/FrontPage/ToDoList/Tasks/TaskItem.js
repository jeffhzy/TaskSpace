import TaskDate from "./TaskDate";
import "./TaskItem.css";
import Checkbox from "@mui/material/Checkbox";
import TaskMenu from "./TaskMenu";
import EditTask from "./EditTask";
import { useEffect, useState } from "react";
import { onSnapshot, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../../Config/firebaseConfig";
import { useAuth } from "../../../../Hooks/useAuth";

const TaskItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskDate, setTaskDate] = useState(props.date);
  const [taskTitle, setTaskTitle] = useState(props.title);
  const [allTasks, setAllTasks] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [taskIndex, setTaskIndex] = useState(-1);
  const { user } = useAuth();

  useEffect(() => {
    const getTasks = async () => {
      onSnapshot(doc(db, "users", user.uid), (document) => {
        setAllTasks(document.data().tasks);
      });
    };
    getTasks();
  }, []);

  useEffect(() => {
    const getTaskStatus = async () => {
      onSnapshot(doc(db, "users", user.uid), (document) => {
        const tasks = document.data().tasks;
        for (const num in tasks) {
          const task = tasks[num];
          if (task.id == props.id) {
            setTaskCompleted(task.completed);
            setTaskIndex(num);
          }
        }
      });
    };
    getTaskStatus();
  }, []);

  const TaskEditingHandler = () => {
    setIsEditing(!isEditing);
  };

  const SubmitHandler = (newtitle, newdate) => {
    setTaskTitle(newtitle);
    setTaskDate(new Date(newdate));
    props.updateHandler(props.id, newtitle, newdate);
    TaskEditingHandler();
  };

  const convertTime = (time) => {
    const hours = Math.floor(time / (60 * 60));
    const minutes = Math.floor((time - 60 * 60 * hours) / 60);
    const seconds = time - hours * 60 * 60 - minutes * 60;
    if (hours === 0) {
      if (minutes === 0) {
        return seconds + "s";
      } else {
        return minutes + "m " + seconds + "s";
      }
    }
    return hours + "h " + minutes + "m " + seconds + "s";
  };

  const checkboxHandler = async () => {
    const currentTask = allTasks[taskIndex];
    let newTask;
    if (taskCompleted) {
      newTask = { ...currentTask, completed: false };
    } else {
      newTask = { ...currentTask, completed: true };
    }
    const tempAllTasks = [];
    for (const num in allTasks) {
      if (num !== taskIndex) {
        tempAllTasks.push(allTasks[num]);
      } else {
        tempAllTasks.push(newTask);
      }
    }
    setAllTasks(tempAllTasks);
    const tasks = tempAllTasks;
    await setDoc(doc(db, "users", user.uid), { tasks }, { merge: true });
  };

  if (!props.view) {
    if (!isEditing) {
      return (
        <li className="task-item">
          <div>
            <TaskDate date={taskDate} />
          </div>
          <div className="task-item__description">
            <h2>{taskTitle}</h2>
            <div className="task-item__rhs">
              <div className="task-item__misc">
                <Checkbox checked={taskCompleted} onClick={checkboxHandler} />
                <div className="task-item__menu">
                  <TaskMenu
                    id={props.id}
                    deleteHandler={props.deleteHandler}
                    editHandler={TaskEditingHandler}
                  />
                </div>
              </div>
              <p className="time-taken">
                Time spent: {convertTime(props.timeTaken)}
              </p>
            </div>
          </div>
        </li>
      );
    } else {
      return (
        <EditTask
          title={taskTitle}
          date={taskDate}
          cancelHandler={TaskEditingHandler}
          submitHandler={SubmitHandler}
        />
      );
    }
  } else {
    return (
      <li className="task-item">
        <div>
          <TaskDate date={taskDate} />
        </div>
        <div className="task-item__description">
          <h2>{taskTitle}</h2>
          <div className="task-item__rhs">
            <p className="time-taken">
              Time spent: {convertTime(props.timeTaken)}
            </p>
          </div>
        </div>
      </li>
    );
  }
};

export default TaskItem;
