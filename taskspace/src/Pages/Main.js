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
import Friends from "./Friends";
import Chats from "./Chats";
import Notes from "./Notes";

const Main = () => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState("");
  const [exp, setExp] = useState(0);

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
      <Header />
      <div className="pageOrientation">
        <Router>
          <Sidebar values={userProfile} />
          <div className="mainPart">
            <Routes>
              <Route
                path="/"
                element={<FrontPage changeExp={setPointsHandler} />}
              />
              <Route path="/friends" element={<Friends />} />
              <Route path="/chats" element={<Chats />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
};

export default Main;
