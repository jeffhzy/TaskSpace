import FriendItem from "./FriendItem";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Config/firebaseConfig";
import { useAuth } from "../../../Hooks/useAuth";


const FriendList = () => {
    const { user } = useAuth();
    const [friendID, setFriendID] = useState([]);
    useEffect(() => {
            const getFriends = async () => {
                const requestSnap = await getDoc(doc(db, "users", user.uid));
                const requests = requestSnap.data().friends;
                setFriendID(requests);
            };
            getFriends();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ul>
            {friendID.map((req) => (
                <FriendItem key={req} id={req} />
            ))}
        </ul>
    );
}

export default FriendList;