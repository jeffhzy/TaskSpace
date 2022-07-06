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
      <Link to="/">
        <button>
          <HomeIcon />
          Main
        </button>
      </Link>
      <Link to="/friends">
        <button>
          <GroupIcon />
          Friends
        </button>
      </Link>
      <Link to="/chats">
        <button>
          <ChatIcon />
          Chats
        </button>
      </Link>
      <Link to="/notes">
        <button>
          <NotesIcon />
          Notes
        </button>
      </Link>
      <Link to="/leaderboard">
        <button>
          <LeaderboardIcon />
          Leaderboards
        </button>
      </Link>
    </div>
  );
};

export default SidebarOptions;
