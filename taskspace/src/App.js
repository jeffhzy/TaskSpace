import { ProvideAuth } from "./Hooks/useAuth";
import { useAuth } from "./Hooks/useAuth";
import FrontPage from "./Pages/FrontPage";
import LoginPage from "./Pages/LoginPage";

const App = () => {
  const { user } = useAuth();
  
  return <ProvideAuth>{user ? <FrontPage /> : <LoginPage />};</ProvideAuth>;

};

export default App;
