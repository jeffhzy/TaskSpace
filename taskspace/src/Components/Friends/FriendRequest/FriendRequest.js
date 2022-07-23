import "./FriendRequest.css";
import Anon from "../../Sidebar/ProfileView/AnonUser.jpg";
import { Button } from "@mui/material";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage, db } from "../../../Config/firebaseConfig";
import { useAuth } from "../../../Hooks/useAuth";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";

//takes id
const FriendRequest = (props) => {
    const { user } = useAuth();
    const [imageURL, setImageURL] = useState(Anon);
    const [responded, setResponded] = useState(false);
    const [requestName, setRequestName] = useState("");

    useEffect(() => {
        const getName = async () => {
            const userSnap = await getDoc(doc(db, "users", props.id));
            const userData = userSnap.data();
            setRequestName(userData.firstName + " " + userData.lastName);
        };
        getName();
    }, []);



    listAll(ref(storage, `${props.id}/profilepic`)).then((res) => {
        if (res.items.length > 0) {
            getDownloadURL(ref(storage, `${props.id}/profilepic`))
                .then((url) => {
                    setImageURL(url);
                }, (error) => { });
        }
    });

    const removeRequest = async () => {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        const requests = docSnap.data().requests.filter((req) => req !== props.id);
        await setDoc(doc(db, "users", user.uid), { requests: requests }, { merge: true });
        setResponded(true);
    }

    const addFriend = async () => {
        removeRequest();
        const docSnap1 = await getDoc(doc(db, "users", user.uid));
        const friends1 = docSnap1.data().friends;
        const docSnap2 = await getDoc(doc(db, "users", props.id));
        const friends2 = docSnap2.data().friends;
        friends1.push(props.id);
        friends2.push(user.uid);
        await setDoc(doc(db, "users", user.uid), { friends: friends1 }, { merge: true });
        await setDoc(doc(db, "users", props.id), { friends: friends2 }, { merge: true }).then(() => {
            window.location.reload();
        })
    }

    return (
        <div className="container-friendRequest">
            {!responded &&
                <>
                    <img src={imageURL} alt={Anon} />
                    <label>{requestName} sent you a friend request</label>
                    <Button variant="outlined" onClick={addFriend}> Accept </Button>
                    <Button variant="outlined" onClick={removeRequest}> Decline </Button>
                </>
            }
        </div>
    )
}

export default FriendRequest;