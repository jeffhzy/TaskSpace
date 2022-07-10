import "./FriendItem.css";
import Anon from "../../Sidebar/ProfileView/AnonUser.jpg";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage, db } from "../../../Config/firebaseConfig";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

//takes id, name
const FriendItem = (props) => {
  const [imageURL, setImageURL] = useState(Anon);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");

  useEffect(() => {
    const getName = async () => {
      const userSnap = await getDoc(doc(db, "users", props.id));
      const userData = userSnap.data();
      setName(userData.firstName + " " + userData.lastName);
      setLevel(Math.floor(userData.points / 300) + 1);
    };
    getName();
  });

  listAll(ref(storage, `${props.id}/profilepic`)).then((res) => {
    if (res.items.length > 0) {
      getDownloadURL(ref(storage, `${props.id}/profilepic`)).then(
        (url) => {
          setImageURL(url);
        },
        (error) => {}
      );
    }
  });

  return (
    <>
      <div className="frienditem">
        <img src={imageURL} alt={Anon} />
        <div className="frienditem__description">
          <Link to={"/profile/" + props.id}>
            <h2>{name}</h2>
          </Link>
          <h3>Level {level}</h3>
        </div>
      </div>
    </>
  );
};

export default FriendItem;
