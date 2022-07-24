import { Link } from "react-router-dom";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import "./SearchNoteItem.css";

const SearchNoteItem = (props) => {
  const closeSearchHandler = () => {
    props.onSearch(false);
    props.onResetSearch("");
  };

  return (
    <Link to={"/notes/" + props.id} style={{ textDecoration: "none" }}>
      <div className="search-item" onClick={closeSearchHandler}>
        <div className="search-note__icon">
          <TextSnippetIcon fontSize="large"/>
        </div>
        <div className="search-particulars">
          <p className="search-particulars_name">{props.title}</p>
          <p className="search-particulars_majorYear">{props.mod}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchNoteItem;
