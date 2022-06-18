import "./ProfileView.css"
import ProfilePicture from "./ShibaInu.jpg"

const ProfileView = (props) => {
    const name = props.name;
    const level = props.level;
    const exp = props.exp;
    
return(
    <div className="profile-container">
    <img src={ProfilePicture} className="profile-icon" alt="Profile"></img>
    <div className="profile-text">{name} </div>
    <div className="profile-text-level"> Level {level} <br/> EXP: {exp}</div>
    </div>
);
};

export default ProfileView;