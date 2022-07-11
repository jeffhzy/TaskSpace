import "./ProfilePicUpload.css";
import { useRef } from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import { storage } from "../../../Config/firebaseConfig";
import { useAuth } from "../../../Hooks/useAuth";
import { ref, uploadBytes } from "firebase/storage";

const ProfilePicUpload = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [coverImageUpload, setCoverImageUpload] = useState(null);
  const { user } = useAuth();

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${user.uid}/profilepic`);
    uploadBytes(imageRef, imageUpload, { contentType: "image/jpeg" }).then(
      () => {
        window.location.reload();
      }
    );
  };

  const uploadCoverImage = () => {
    if (coverImageUpload == null) return;
    const imageRef = ref(storage, `${user.uid}/coverpic`);
    uploadBytes(imageRef, coverImageUpload, { contentType: "image/jpeg" }).then(
      () => {
        window.location.reload();
      }
    );
  };

  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const uploadProcess = () => {
    if (imageUpload !== null && imageUpload.type.split("/")[0] === "image") {
      uploadImage();
    } else {
      return;
    }
  };

  const uploadProcessCover = () => {
    if (coverImageUpload !== null && coverImageUpload.type.split("/")[0] === "image") {
      uploadCoverImage();
    } else {
      return;
    }
  };


  return (
    <div>
      <div className="uploadpic-container">
        <input
          type="file"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          onChange={(e) => {
            setImageUpload(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
        <Button variant="contained" color="primary" onClick={handleClick}>
          Select Profile Picture
        </Button>
        <Button variant="contained" color="primary" onClick={uploadProcess}>
          Upload
        </Button>
        {imageUpload === null ? (
          <></>
        ) : (
          <img
            src={URL.createObjectURL(imageUpload)}
            alt="Incorrect file type"
          />
        )}
      </div>
      <div className="uploadpic-container">
        <input
          type="file"
          ref={hiddenFileInput}
          style={{ display: "none" }}
          onChange={(e) => {
            setCoverImageUpload(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        />
        <Button variant="contained" color="primary" onClick={handleClick}>
          Select Cover Picture
        </Button>
        <Button variant="contained" color="primary" onClick={uploadProcessCover}>
          Upload
        </Button>
        {coverImageUpload === null ? (
          <></>
        ) : (
          <img
            src={URL.createObjectURL(coverImageUpload)}
            alt="Incorrect file type"
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePicUpload;
