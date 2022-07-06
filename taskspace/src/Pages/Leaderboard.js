import { db } from "../Config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Ranking from "../Components/Leaderboard/Ranking";
import { useState, useEffect } from "react";
import { Container } from "@mui/system";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const insertData = async () => {
      const Data = await getDocs(collection(db, "users"));
      Data.forEach((doc) => {
        users.push(doc.data());
      });
      // getDocs(collection(db, "users")).then((docs) => {
      //   docs.forEach((doc) => {
      //     users.push(doc.data());
      //   });
      // });
    };
    insertData();
  }, []);

  const sortedUser = users.sort((a, b) => b.points - a.points);

  return (
    <div className="leaderboard">
      <Container>
        <h2>Leaderboard</h2>
        <div className="leaderboard-buttons">
          <button id="all-button">All</button>
          <button id="friends-button">Friends</button>
        </div>
        <ul>
          {sortedUser.map((user) => (
            <Ranking
              name={user.firstName + " " + user.lastName}
              points={user.points}
              major={user.major}
              key={user.email}
            />
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default Leaderboard;
