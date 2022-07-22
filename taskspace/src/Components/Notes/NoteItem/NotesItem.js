import "./NotesItem.css";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState, useEffect } from "react";
import { db } from "../../../Config/firebaseConfig";

//takes id
const NotesItem = (props) => {
    const [title, setTitle] = useState("");
    const [module, setModule] = useState("");
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        const getNote = async () => {
            const notesSnap = await getDoc(doc(db, "notes", props.id));
            const notesData = notesSnap.data();
            setTitle(notesData.title);
            setModule(notesData.module);
            setLikes(notesData.likes);
        };
        getNote();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    return (
        <>
            <Link to={"/notes/" + props.id} style={{ textDecoration: "none" }}>
                <div className="notesitem">
                    <div className="notesitem__description">
                        <h2>{title}</h2>
                        <div className="notesitem_left">
                            <h3>{module}</h3>

                            <h3><FavoriteIcon sx={{ color: 'white', marginRight: '5px' }} />{String(likes)}</h3>
                        </div>
                    </div>
                </div>
            </Link>
        </>

    );
};

export default NotesItem;
