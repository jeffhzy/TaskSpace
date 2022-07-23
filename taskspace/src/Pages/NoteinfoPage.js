import "./NoteinfoPage.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage, db } from "../Config/firebaseConfig";
import { useAuth } from "../Hooks/useAuth";

//takes in note id
const NotesInfo = (props) => {
    const { user } = useAuth();
    const [title, setTitle] = useState("");
    const [module, setModule] = useState("");
    const [likes, setLikes] = useState(0);
    const [date, setDate] = useState("");
    const [desc, setDesc] = useState("");
    const [owner, setOwner] = useState("");
    const [ownerID, setOwnerID] = useState("");
    const [file, setFile] = useState(null);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const getInfo = async () => {
            const notesSnap = await getDoc(doc(db, "notes", props.id));
            const notesData = notesSnap.data();
            const ownerSnap = await getDoc(doc(db, "users", notesData.owner));
            const ownerData = ownerSnap.data();
            setTitle(notesData.title);
            setModule(notesData.module);
            setLikes(notesData.likes);
            setDate(notesData.date);
            setDesc(notesData.desc);
            setOwnerID(ownerSnap.id);
            setOwner(ownerData.firstName + " " + ownerData.lastName);

            const userSnap = await getDoc(doc(db, "users", user.uid));
            const userData = userSnap.data();

            if (userData.likedNotes.includes(props.id)) { setLiked(true) }
        };
        getInfo();

        const download = () => {
            listAll(ref(storage, `${user.uid}`)).then((res) => {
                if (res.items.length > 0) {
                    getDownloadURL(ref(storage, `notes/${props.id}/file`))
                        .then((url) => {
                            setFile(url);
                        }, (error) => { });
                }
            })
        }
        download();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const changeLiked = async () => {

        const userSnap = await getDoc(doc(db, "users", user.uid));
        const userData = userSnap.data();
        const notesSnap = await getDoc(doc(db, "notes", props.id));
        const notesData = notesSnap.data();
        var newlikes = notesData.likes;
        const allLiked = userData.likedNotes;
        var changed = [];
        if (allLiked.includes(props.id)) {
            changed = allLiked.filter((note) => note !== props.id);
            newlikes--;
        } else {
            allLiked.push(props.id);
            changed = allLiked;
            newlikes++
        }
        await setDoc(doc(db, "users", user.uid), { likedNotes: changed }, { merge: true });
        await setDoc(doc(db, "notes", props.id), { likes: newlikes }, { merge: true });
        setLikes(newlikes);
        setLiked(!liked);
    }

    return (
        <div className="notesInfo">
            <h1>{title.toUpperCase()}</h1>
            <h2>{module}</h2>
            {!liked && <Button variant="outlined" onClick={changeLiked}>like<FavoriteBorderIcon sx={{ marginLeft: "5px" }} />{likes}</Button>}
            {liked && <Button variant="outlined" onClick={changeLiked}>unlike<FavoriteIcon sx={{ marginLeft: "5px" }} />{likes}</Button>}
            <h5>{desc}</h5>
            <label>Created by {owner}, {date}</label>
            <div>
                <a href={file} download><Button variant="contained">View</Button></a>
            </div>
            

        </div>
    )
}

export default NotesInfo;