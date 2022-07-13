import "./FriendItem.css";
import Anon from "../../Sidebar/ProfileView/AnonUser.jpg";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage, db } from "../../../Config/firebaseConfig";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import ProgressBar from "../../Sidebar/ProgressBar/ProgressBar";

//takes id, name
const FriendItem = (props) => {
  const [imageURL, setImageURL] = useState(Anon);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const getName = async () => {
      const userSnap = await getDoc(doc(db, "users", props.id));
      const userData = userSnap.data();
      setProgress(Math.floor(((userData.points % 2) / 2) * 100) + "%");
      setName(userData.firstName + " " + userData.lastName);
      setLevel(Math.floor(userData.points / 2) + 1);
    };
    getName();
  });

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
    <>
      <Link to={"/profile/" + props.id} style={{ textDecoration: "none"}}>
        <div className="frienditem">
          <img src={imageURL} alt={Anon} />
          <div className="frienditem__description">
            <h2>{name}</h2>
            <div className="frienditem_level">
              <h3>Level {level}</h3>
              <ProgressBar progress={progress} />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default FriendItem;
