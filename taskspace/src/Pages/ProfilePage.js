import "./ProfilePage.css";
import Anon from "../Components/Sidebar/ProfileView/AnonUser.jpg";
import NUS from "../Components/Sidebar/ProfileView/NUS.png";
import { Button } from "@mui/material";
import { ref, getDownloadURL } from "firebase/storage";
import { storage, db } from "../Config/firebaseConfig";
import { useAuth } from "../Hooks/useAuth";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Tasks from "../Components/FrontPage/ToDoList/Tasks/Tasks";
import ProgressBar from "../Components/Sidebar/ProgressBar/ProgressBar";

//takes in userid as id, if it's the current account, just pass props as id=""
const ProfilePage = (props) => {
  const { user } = useAuth();
  const [imageURL, setImageURL] = useState(Anon);
  const [coverImageURL, setCoverImageURL] = useState(NUS);
  const userUid = props.id === "" ? user.uid : props.id;
  const [added, setAdded] = useState(props.id === "" ? null : false);
  const [userProfile, setUserProfile] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getDownloadURL(ref(storage, `${userUid}/profilepic`)).then((url) => {
      setImageURL(url);
    });
    getDownloadURL(ref(storage, `${userUid}/coverpic`)).then((url) => {
      setCoverImageURL(url);
    });
    const getStartInfo = async () => {
      const Data = await getDoc(doc(db, "users", userUid));
      const DataSelf = await getDoc(doc(db, "users", user.uid));
      setUserProfile({
        name: Data.data().firstName + " " + Data.data().lastName,
        level: Math.floor(Data.data().points / 2) + 1,
        majorYear: Data.data().year + " " + Data.data().major,
        progress: Math.floor(((Data.data().points % 2) / 2) * 100) + "%",
        requests: Data.data().requests,
      });
      const friendCheck =
        Data.data().friends.filter((i) => i === user.uid).length > 0
          ? true
          : false;
      const requestCheck =
        DataSelf.data().requests.filter((i) => i === userUid).length > 0
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
          { requests: [...userProfile.requests, user.uid] },
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

  useEffect(() => {
    const getTasks = async () => {
      const Data = await getDoc(doc(db, "users", props.id));
      setTasks(Data.data().tasks);
    };
    getTasks();
  }, []);

  const convertTaskList = (tasklist) => {
    return tasklist
      ? tasklist.map((task) =>
        true
          ? { id: task.id, title: task.title, date: new Date(task.date) }
          : {}
      )
      : tasklist;
  };

  return (
    <div className="profile-mainPart">
      <img src={coverImageURL} alt={NUS} className="cover-image" />
      <img src={imageURL} alt={Anon} className="profile-icon" />
      <label className="profile-name">{userProfile.name}</label>
      <label className="profile-majorYear">{userProfile.majorYear}</label>
      <div className="profile-misc">
        <label
          style={{ marginTop: "0px", fontSize: "25px", marginLeft: "5%" }}
          className={props.id !== user.uid ? "profile-level" : "profile-level-user"}
        >
          Level {userProfile.level}
          <div className="profile-levelbar">
            <ProgressBar progress={userProfile.progress} />
          </div>
        </label>
        {user.uid !== props.id && (
          <div className="profile-friend-button">
            {added === null ? (
              <></>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                onClick={requestHandler}
              >
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
        )}
      </div>
      <div className="profile-task">
        <Tasks tasks={convertTaskList(tasks)} view={true} />
      </div>
    </div>
  );
};

export default ProfilePage;
