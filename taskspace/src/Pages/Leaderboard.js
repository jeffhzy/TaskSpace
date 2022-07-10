import Ranking from "../Components/Leaderboard/Ranking";
import { useState, useEffect } from "react";
import { Container } from "@mui/system";
import "./Leaderboard.css";
import getContentData from "../Others/ImportAllData";
import getFriendsData from "../Others/ImportFriendsData";
import { useAuth } from "../Hooks/useAuth";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const { user } = useAuth();

  const setAllHandler = () => {
    setFilter("all");
  };

  const setFriendsHandler = () => {
    setFilter("friends");
  };

  useEffect(() => {
    if (filter === "all") {
      getContentData().then(setUsers);
    } else {
      getFriendsData(user.uid).then(setUsers);
    }
  }, [users, filter]);

  const sortedUser = users.sort((a, b) => b.data().points - a.data().points);

  return (
    <div className="leaderboard">
      <Container>
        <h2>Leaderboard</h2>
        <div className="leaderboard-buttons">
          <button id="all-button" onClick={setAllHandler}>
            All
          </button>
          <button id="friends-button" onClick={setFriendsHandler}>
            Friends
          </button>
        </div>
        <ul>
          {sortedUser.map((student) => (
            <Ranking
              name={student.data().firstName + " " + student.data().lastName}
              points={student.data().points}
              major={student.data().major}
              id={student.id}
              key={student.data().email}
            />
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default Leaderboard;
