import "./Ranking.css";
import Anon from "../Sidebar/ProfileView/AnonUser.jpg";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../Config/firebaseConfig";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Ranking = (props) => {
  const [imageURL, setImageURL] = useState(Anon);
  useEffect(() => {
    listAll(ref(storage, `${props.id}`)).then((res) => {
      if (res.items.length > 0) {
        getDownloadURL(ref(storage, `${props.id}/profilepic`)).then(
          (url) => {
            setImageURL(url);
          },
          (error) => {}
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ranking">
      <img src={imageURL} alt={Anon} />
      <div className="ranking-name-major-points">
        <div className="ranking-particulars">
          <Link to={"/profile/" + props.id}>
            <p id="ranking-name">{props.name}</p>
          </Link>
          <div>
            <p id="ranking-major">{props.major}</p>
          </div>
        </div>
        <div>
          <p id="ranking-points">{Math.round(props.points)}</p>
        </div>
      </div>
    </div>
  );
};

export default Ranking;
