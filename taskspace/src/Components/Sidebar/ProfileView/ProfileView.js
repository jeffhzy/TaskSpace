import "./ProfileView.css"
import Anon from "./AnonUser.jpg";
import { useAuth } from "../../../Hooks/useAuth";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../../Config/firebaseConfig";
import { useState, useEffect } from "react";

const ProfileView = (props) => {
    const [imageURL, setImageURL] = useState(Anon);
    const { user } = useAuth();
    const name = props.name;
    const level = props.level;
    const exp = props.exp;

    useEffect(() => {
        listAll(ref(storage, `${user.uid}/profilepic`)).then((res) => {
            if (res.items.length > 0) {
            getDownloadURL(ref(storage, `${user.uid}/profilepic`))
            .then((url) => {
                setImageURL(url);
            },(error) => {});
        }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="profile-container">
            <img src={imageURL} alt={Anon} className="profile-icon"></img>
            <div className="profile-text">{name} </div>
            <div className="profile-text-level"> Level {level} <br /> EXP: {exp}</div>
        </div>
    );
};

export default ProfileView;