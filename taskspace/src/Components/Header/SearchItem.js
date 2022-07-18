import "./SearchItem.css";
import Anon from "../Sidebar/ProfileView/AnonUser.jpg";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../Config/firebaseConfig";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SearchItem = (props) => {
  const [imageURL, setImageURL] = useState(Anon);

  const closeSearchHandler = () => {
    props.onSearch(false);
    props.onResetSearch("");
  };

  useEffect(() => {
    listAll(ref(storage, `${props.id}`)).then((res) => {
      if (res.items.length > 0) {
        getDownloadURL(ref(storage, `${props.id}/profilepic`)).then(
          (url) => {
            setImageURL(url);
          },
          (error) => {}
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Link to={"/profile/" + props.id} style={{ textDecoration: "none" }}>
      <div className="search-item" onClick={closeSearchHandler}>
        <img src={imageURL} alt={Anon} />
        <div className="search-particulars">
          <p className="search-particulars_name">{props.name}</p>
          <p className="search-particulars_majorYear">
            {props.year + " " + props.major}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchItem;
