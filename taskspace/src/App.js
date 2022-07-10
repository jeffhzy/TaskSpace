import { useState, useEffect } from "react";
import { useAuth } from "./Hooks/useAuth";
import LoginPage from "./Pages/LoginPage";
import Main from "./Pages/Main";
import getContentData from "./Others/ImportAllData";

const App = () => {
  const { user } = useAuth();
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    getContentData().then(setAllUsers);
  }, [allUsers]);

  return <div>{user ? <Main /> : <LoginPage />};</div>;
};

export default App;
