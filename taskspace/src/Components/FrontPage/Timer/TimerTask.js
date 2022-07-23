import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../../Config/firebaseConfig";
import { useEffect, useState } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import { Autocomplete, TextField } from "@mui/material";

const TimerTask = (props) => {
  const { user } = useAuth();
  const [taskTitles, setTaskTitles] = useState([]);

  useEffect(() => {
    const getTitles = () => {
      onSnapshot(doc(db, "users", user.uid), (document) => {
        const temp = [];
        const tasks = document.data().tasks;
        for (const num in tasks) {
          const task = tasks[num];
          temp.push(task.title);
        }
        setTaskTitles(temp);
      });
    };
    getTitles();
  }, []);

  const changeTaskHandler = (event, value) => {
    props.onChosenTask(value);
  };

  return (
    <div>
      <Autocomplete
        disablePortal
        id="task-titles"
        options={taskTitles}
        sx={{ width: 300 }}
        value={props.chosenTask}
        onChange={changeTaskHandler}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Task"
            variant="filled"
            color="secondary"
          />
        )}
      />
    </div>
  );
};

export default TimerTask;
