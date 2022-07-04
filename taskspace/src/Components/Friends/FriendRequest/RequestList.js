import FriendRequest from "./FriendRequest";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Config/firebaseConfig";
import { useAuth } from "../../../Hooks/useAuth";


const RequestList = () => {
    const { user } = useAuth();
    const [requestID, setRequestID] = useState([]);
    useEffect(() => {
            const getRequests = async () => {
                const requestSnap = await getDoc(doc(db, "users", user.uid));
                const requests = requestSnap.data().requests;
                setRequestID(requests);
            };
            getRequests();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ul style={{marginTop:'10px'}}>
            {requestID.map((req) => (
                <FriendRequest key={req} id={req} />
            ))}
        </ul>
    );
}

export default RequestList;