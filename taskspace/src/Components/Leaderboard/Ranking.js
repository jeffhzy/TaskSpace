import "./Ranking.css";

const Ranking = (props) => {
  return (
    <div className="ranking">
      <div className="ranking-particulars">
        <div>
          <p id="ranking-name">{props.name}</p>
        </div>
        <div>
          <p id="ranking-major">{props.major}</p>
        </div>
      </div>
      <div>
        <p id="ranking-points">{Math.round(props.points)}</p>
      </div>
    </div>
  );
};

export default Ranking;
