import { useState, useEffect } from "react";
import Clock from "./Clock";
import "./Timer.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import TimerTask from "./TimerTask";

const Timer = (props) => {
  const [isTiming, setIsTiming] = useState(false);
  const [time, setTime] = useState(0);
  const [timerID, setTimerID] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);

  const onStopHandler = () => {
    setIsTiming(false);
  };

  const onStartHandler = () => {
    setIsTiming(true);
  };

  const onResetHandler = () => {
    setTime(0);
    setIsTiming(false);
  };

  const onLogHandler = () => {
    props.onRecordTime(time, selectedTask);
    const newPoints = time / 100;
    setTime(0);
    setIsTiming(false);
    props.setPointHandler(newPoints);
  };

  const changeSelectedTaskHandler = (chosenTask) => {
    setSelectedTask(chosenTask);
  };

  useEffect(() => {
    let intervalID;
    if (isTiming) {
      intervalID = setInterval(() => {
        setTime((prev) => (prev += 1));
      }, 1000);

      setTimerID(intervalID);
    } else {
      clearInterval(timerID);
    }

    return () => {
      if (time !== 0) {
        clearInterval(timerID);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTiming]);

  return (
    <div className="timer">
      <div>
        <TimerTask
          onChosenTask={changeSelectedTaskHandler}
          chosenTask={selectedTask}
        />
      </div>
      <div>
        <Clock time={time} />
      </div>
      <div className="timer-buttons">
        <button onClick={isTiming ? onStopHandler : onStartHandler}>
          {isTiming ? <StopIcon /> : <PlayArrowIcon />}
        </button>
        <button onClick={onResetHandler}>
          <RestartAltIcon />
        </button>
        <button className="timer__log" onClick={onLogHandler}>
          Log Session
        </button>
      </div>
    </div>
  );
};

export default Timer;
