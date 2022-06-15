import "./Clock.css";

const Clock = (props) => {
  const time = parseInt(props.time);
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time - 60 * 60 * hours) / 60);
  const seconds = time - hours * 60 * 60 - minutes * 60;

  return (
    <div className="clock">
      <div className="clock-data">
        <p>{hours}</p>
        <h2>HOURS</h2>
      </div>
      <div className="clock-data">
        <p>{minutes}</p>
        <h2>MINUTES</h2>
      </div>
      <div className="clock-data">
        <p>{seconds}</p>
        <h2>SECONDS</h2>
      </div>
    </div>
  );
};

export default Clock;
