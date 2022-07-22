import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import FrontPage from "./FrontPage";
import Leaderboard from "./Leaderboard";
import { db } from "../Config/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/useAuth";
import "./Main.css";
import Chats from "./Chats";
import NoteinfoPage from "./NoteinfoPage";
import Notes from "./Notes";
import FriendPage from "./FriendPage";
import AccountPage from "./AccountPage";
import ProfilePage from "./ProfilePage";
import NotesInfo from "./NoteinfoPage";
import { getContentData, getNotesData } from "../Others/ImportAllData";

const Main = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState("");
  const [exp, setExp] = useState(0);
  const [allUsers, setAllUsers] = useState([]);
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    getContentData().then(setAllUsers);
    getNotesData().then(setAllNotes);
  }, [allUsers]);


  //to get from database
  useEffect(() => {
    const getStartInfo = async () => {
      const Data = await getDoc(doc(db, "users", user.uid));
      setExp(Data.data().points);
      setUserProfile({
        name: Data.data().firstName + " " + Data.data().lastName,
        expVal: Data.data().points,
        expMax: 2,
      });
    };
    getStartInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPointsHandler = (newPoints) => {
    const setPoints = async () => {
      await setDoc(
        doc(db, "users", user.uid),
        { points: exp + newPoints },
        { merge: true }
      );
    };
    setPoints();
    setExp(exp + newPoints);
    setUserProfile({ ...userProfile, expVal: exp + newPoints });
  };

  return (
    <div>
      <Router>
        <Header />
        <div className="pageOrientation">
          <Sidebar values={userProfile} />
          <div className="mainPart">
            <Routes>
              <Route
                path="/"
                element={<FrontPage changeExp={setPointsHandler} />}
              />
              <Route path="/friends" element={<FriendPage />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="" element={<ProfilePage />} />
              {allUsers.map((currentUser) => (
                <Route
                  path={"/profile/" + currentUser.id}
                  element={
                    <ProfilePage id={currentUser.id} key={currentUser.id} />
                  }
                />
              ))}
              {allNotes.map((currentNote) => (
                <Route
                  path={"/notes/" + currentNote.id}
                  element={
                    <NoteinfoPage id={currentNote.id} key={currentNote.id} />
                  }
                />
              ))}
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default Main;
