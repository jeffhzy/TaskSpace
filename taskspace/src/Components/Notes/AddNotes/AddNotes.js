import "./AddNotes.css";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { storage, db } from "../../../Config/firebaseConfig";
import { useAuth } from "../../../Hooks/useAuth";
import { ref, uploadBytes } from "firebase/storage";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore"
import { today } from "../../../Others/Dates";
import NotesItem from "../NoteItem/NotesItem";

const AddNotes = () => {
    const { user } = useAuth();
    const [title, setTitle] = useState("");
    const [module, setModule] = useState("");
    const [desc, setDesc] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [adding, setAdding] = useState(false);
    const [noteFile, setNoteFile] = useState(null);
    const [notesID, setNotesID] = useState([]);

    const titleHandler = (event) => {
        setTitle(event.target.value);
    };

    const moduleHandler = (event) => {
        setModule(event.target.value);
    };

    const descHandler = (event) => {
        setDesc(event.target.value);
    };

    const queryNotes = async () => {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        setNotesID(docSnap.data().notes);
    }

    useEffect(() => {
        queryNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    });

    const submitHandler = () => {
        const addToFirebase = async () => {
            await addDoc(collection(db, "notes"),
                { "title": title, "module": module.toUpperCase(), "desc": desc, "owner": user.uid, "likes": 0, "date": today })
                .then(async (note) => {
                    uploadBytes(ref(storage, `notes/${note.id}/file`), noteFile)
                    const docSnap = await getDoc(doc(db, "users", user.uid));
                    const currentNotes = docSnap.data().notes;
                    currentNotes.push(note.id);
                    await setDoc(doc(db, "users", user.uid), { notes: currentNotes }, { merge: true })
                }
                );

        };
        addToFirebase();
        cancelHandler();
        setAdding(true);
        queryNotes();
    };

    const cancelHandler = () => {
        setAdding(false);
        setIsValid(true);
        setNoteFile(null);
        setTitle("");
        setModule("");
        setDesc("");
    };

    const validSubmitHandler = (event) => {
        event.preventDefault();
        if (!(title !== "" && module !== "" && noteFile != null)) {
            setIsValid(false);
        } else {
            setIsValid(true);
            submitHandler();
        }
    }
    const hiddenFileInput = useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    return (
        <>
            <div className="add-notes">
                {!adding &&
                    <button type="button" onClick={() => { setAdding(true); }}>Add Notes</button>
                }
            </div>
            {adding &&
                <div className="new-notes">
                    <form onSubmit={validSubmitHandler}>
                        <div className="new-notes__controls">
                            <div className="new-notes__control">
                                <label>Title</label>
                                <input type="text" value={title} onChange={titleHandler} />
                            </div>
                            <div className="new-notes__control">
                                <label>Module</label>
                                <input
                                    type="text"
                                    value={module}
                                    onChange={moduleHandler}
                                ></input>
                            </div>
                        </div>
                        <div className="new-notes__controls">
                            <div className="new-notes__control">
                                <label>Description</label>
                                <input type="text" value={desc} onChange={descHandler} style={{ width: '41rem' }} />
                            </div>
                        </div>
                        <div>
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                style={{ display: "none" }}
                                onChange={(e) => {
                                    setNoteFile(e.target.files[0]);
                                }}
                            />
                            <button type="button" onClick={handleClick}>
                                Select File
                            </button>
                        </div>
                        {noteFile !== null && <label>{noteFile.name}</label>}
                        <div className="new-notes__actions">
                            {isValid !== true ? <label>*Missing fields: Please fill in title and module code</label> : <></>}
                            <button type="button" onClick={cancelHandler}>
                                Cancel
                            </button>
                            <button type="submit">Add Notes</button>
                        </div>
                    </form>
                </div>
            }
            {notesID.map((note) => 
             <NotesItem id={note} />   
            )}
        </>
    );
}

export default AddNotes;