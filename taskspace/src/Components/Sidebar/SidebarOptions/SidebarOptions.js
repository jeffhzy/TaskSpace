import "./SidebarOptions.css"
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import NotesIcon from '@mui/icons-material/Notes';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

const SidebarOptions= () => {

return(

    <div className="sidebarOptions">
         <button><HomeIcon />  Main</button>
         <button><GroupIcon />  Friends</button>
         <button><ChatIcon/>   Chats</button>
         <button><NotesIcon />   Notes</button>
         <button><LeaderboardIcon />   Leaderboards</button>
    </div>

);
};

export default SidebarOptions;