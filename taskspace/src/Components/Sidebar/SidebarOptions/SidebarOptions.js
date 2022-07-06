import "./SidebarOptions.css";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import ChatIcon from "@mui/icons-material/Chat";
import NotesIcon from "@mui/icons-material/Notes";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { Link } from "react-router-dom";

const SidebarOptions = () => {
  return (
    <div className="sidebarOptions">
      <button>
        <HomeIcon />
        <Link to="/">Main</Link>
      </button>
      <button>
        <GroupIcon />
        <Link to="/friends">Friends</Link>
      </button>
      <button>
        <ChatIcon />
        <Link to="/chats">Chats</Link>
      </button>
      <button>
        <NotesIcon />
        <Link to="/notes">Notes</Link>
      </button>
      <button>
        <LeaderboardIcon />
        <Link to="/leaderboard">Leaderboards</Link>
      </button>
    </div>
  );
};

export default SidebarOptions;
