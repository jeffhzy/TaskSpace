import { useState, useEffect } from "react";
import { useAuth } from "./Hooks/useAuth";
import LoginPage from "./Pages/LoginPage";
import Main from "./Pages/Main";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./Config/firebaseConfig";

const App = () => {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const requestSnap = onSnapshot(collection(db, "users"), (docs) => {
        docs.forEach((doc) => {
          allUsers.push(doc);
        });
      });
    };
    getAllUsers();
  }, [allUsers]);

  useEffect(() => {
    const getAllNotes = async () => {
      const requestSnap = onSnapshot(collection(db, "notes"), (docs) => {
        docs.forEach((doc) => {
          allNotes.push(doc);
        });
      });
    };
    getAllNotes();
  }, [allNotes]);

  return <div>{user ? <Main /> : <LoginPage />};</div>;
};

export default App;
