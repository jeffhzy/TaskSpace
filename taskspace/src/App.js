import { useAuth } from "./Hooks/useAuth";
import LoginPage from "./Pages/LoginPage";
import Main from "./Pages/Main";

const App = () => {
  const { user } = useAuth();

  return <div>{user ? <Main /> : <LoginPage />};</div>;
};

export default App;
