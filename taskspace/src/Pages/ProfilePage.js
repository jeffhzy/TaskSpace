import "./ProfilePage.css";
import Anon from "../Components/Sidebar/ProfileView/AnonUser.jpg";
import { Button } from "@mui/material";
import { ref, getDownloadURL } from "firebase/storage";
import { storage, db } from "../Config/firebaseConfig";
import { useAuth } from "../Hooks/useAuth";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";

//takes in userid as id, if it's the current account, just pass props as id=""
const ProfilePage = (props) => {
  const { user } = useAuth();
  const [imageURL, setImageURL] = useState(Anon);
  const userUid = props.id === "" ? user.uid : props.id;
  const [added, setAdded] = useState(props.id === "" ? null : false);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    getDownloadURL(ref(storage, `${userUid}/profilepic`)).then((url) => {
      setImageURL(url);
    });
    const getStartInfo = async () => {
      const Data = await getDoc(doc(db, "users", userUid));
      setUserProfile({
        name: Data.data().firstName + " " + Data.data().lastName,
        level: Math.floor(Data.data().points / 300) + 1,
      });
      const friendCheck =
        Data.data().friends.filter((i) => i === user.uid).length > 0
          ? true
          : false;
      const requestCheck =
        Data.data().requests.filter((i) => i === user.uid).length > 0
          ? "request"
          : false;
      friendCheck ? setAdded(true) : setAdded(requestCheck);
      if (Data.data().requests.filter((r) => r === user.uid)[0] === user.uid) {
        setAdded("sent");
      }
    };
    getStartInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeRequest = async () => {
    const docSnap = await getDoc(doc(db, "users", user.uid));
    const requests = docSnap.data().requests.filter((req) => req !== props.id);
    await setDoc(
      doc(db, "users", user.uid),
      { requests: requests },
      { merge: true }
    );
  };

  const addFriend = async () => {
    removeRequest();
    const docSnap1 = await getDoc(doc(db, "users", user.uid));
    const friends1 = docSnap1.data().friends;
    const docSnap2 = await getDoc(doc(db, "users", props.id));
    const friends2 = docSnap2.data().friends;
    friends1.push(props.id);
    friends2.push(user.uid);
    await setDoc(
      doc(db, "users", user.uid),
      { friends: friends1 },
      { merge: true }
    );
    await setDoc(
      doc(db, "users", props.id),
      { friends: friends2 },
      { merge: true }
    );
  };

  const removeFriend = async () => {
    const docSnap1 = await getDoc(doc(db, "users", user.uid));
    const friend1 = docSnap1.data().friends.filter((req) => req !== props.id);
    const docSnap2 = await getDoc(doc(db, "users", props.id));
    const friend2 = docSnap2.data().friends.filter((req) => req !== user.uid);

    await setDoc(
      doc(db, "users", user.uid),
      { friends: friend1 },
      { merge: true }
    );
    await setDoc(
      doc(db, "users", props.id),
      { friends: friend2 },
      { merge: true }
    );
  };

  const requestHandler = () => {
    if (added === false) {
      const sendRequest = async () => {
        await setDoc(
          doc(db, "users", userUid),
          { requests: [user.uid] },
          { merge: true }
        );
      };
      sendRequest();
      setAdded("sent");
    } else if (added === "request") {
      addFriend();
      setAdded(true);
    } else if (added === true) {
      removeFriend();
      setAdded(false);
    }
  };

  return (
    <div className="profile-mainPart">
      <img src={imageURL} alt={Anon} className="profile-icon"></img>
      <label>{userProfile.name}</label>
      <label style={{ marginTop: "0px", fontSize: "25px" }}>
        Level {userProfile.level}
      </label>
      {added === null ? (
        <></>
      ) : (
        <Button variant="outlined" color="primary" onClick={requestHandler}>
          {added === false
            ? "Send Friend Request"
            : added === "sent"
            ? `Friend Request Sent`
            : added === "request"
            ? "Accept Friend Request"
            : "Remove Friend"}
        </Button>
      )}
    </div>
  );
};

export default ProfilePage;
