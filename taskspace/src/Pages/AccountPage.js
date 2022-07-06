import "./AccountPage.css";
import ProfilePicUpload from "../Components/Account/ProfilePicUpload/ProfilePicUpload";


const AccountPage = () => {
    return (
            <div className="pageOrientation">
                <div className="mainPart">
                    <ProfilePicUpload />
                </div>
            </div>
    );
};

export default AccountPage;
