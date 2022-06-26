import { useState, useEffect } from "react";
import Clock from "./Clock";
import "./Timer.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const Timer = (props) => {
  const [isTiming, setIsTiming] = useState(false);
  const [time, setTime] = useState(0);
  const [timerID, setTimerID] = useState(0);

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
    const newPoints = (time / 100);
    setTime(0);
    setIsTiming(false);
    props.setPointHandler(newPoints);
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
  }, [isTiming]);

  return (
    <div className="timer">
      <div>
        <Clock time={time} />
      </div>
      <div>
        <button onClick={isTiming ? onStopHandler : onStartHandler}>
          {isTiming ? <StopIcon /> : <PlayArrowIcon />}
        </button>
        <button onClick={onResetHandler}>
          <RestartAltIcon />
        </button>
        <button className="timer__log" onClick={onLogHandler}>Log Session</button>
      </div>
    </div>
  );
};

export default Timer;
