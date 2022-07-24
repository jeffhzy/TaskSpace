import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { getContentData, getNotesData } from "../../Others/ImportAllData";
import SearchItem from "./SearchItem";
import "./SearchBar.css";
import SearchNoteItem from "./SearchNoteItem";

const SearchBar = () => {
  const [enteredSearch, setEnteredSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [allNotes, setAllNotes] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    getContentData().then(setAllUsers);
  }, [allUsers]);

  useEffect(() => {
    getNotesData().then(setAllNotes);
  }, [allNotes]);

  const searchChangeHandler = (event) => {
    if (event.target.value === "") {
      setOpenSearch(false);
    } else {
      setOpenSearch(true);
    }
    setEnteredSearch(event.target.value);
    setFilteredUsers(filterList(event.target.value));
    setFilteredNotes(filterNotes(event.target.value));
  };

  const filterList = (query) => {
    const search = query.toLowerCase();
    const filteredList = [];
    const filteredNote = [];
    for (const num in allUsers) {
      const user = allUsers[num];
      const fullName =
        user.data().firstName.toLowerCase() +
        " " +
        user.data().lastName.toLowerCase();
      if (
        user.data().firstName.toLowerCase().startsWith(search) ||
        user.data().lastName.toLowerCase().startsWith(search) ||
        user.data().major.toLowerCase().startsWith(search) ||
        user.data().year.toLowerCase().startsWith(search) ||
        user.data().year.toLowerCase().includes(search) ||
        fullName.startsWith(search)
      ) {
        filteredList.push(user);
      }
    }
    return filteredList;
  };

  const filterNotes = (query) => {
    const search = query.toLowerCase();
    const filteredList = [];
    for (const num in allNotes) {
      const note = allNotes[num];
      if (
        note.data().title.toLowerCase().includes(search) ||
        note.data().module.toLowerCase().includes(search)
      ) {
        filteredList.push(note);
      }
    }
    return filteredList;
  };

  return (
    <div>
      <div className="search-bar">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            width: 400,
            marginRight: "20px",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search notes or people"
            onChange={searchChangeHandler}
            value={enteredSearch}
          />
          <IconButton
            sx={{ p: "8px" }}
            aria-label="search"
            style={{ outline: "none" }}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div className="search-content">
        {openSearch &&
          filteredUsers.map((student) => (
            <SearchItem
              name={student.data().firstName + " " + student.data().lastName}
              year={student.data().year}
              major={student.data().major}
              id={student.id}
              key={student.data().email}
              onSearch={setOpenSearch}
              onResetSearch={setEnteredSearch}
            />
          ))}
        {openSearch &&
          filteredNotes.map((note) => (
            <SearchNoteItem
              title={note.data().title}
              mod={note.data().module.toUpperCase()}
              id={note.id}
              key={note.id}
              onSearch={setOpenSearch}
              onResetSearch={setEnteredSearch}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
