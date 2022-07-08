import ProfilePicUpload from "../Components/Account/ProfilePicUpload/ProfilePicUpload";
import "./AccountPage.css";

const AccountPage = () => {
  return (
    <div className="account-pageOrientation">
      <div className="account-mainPart">
        <ProfilePicUpload />
      </div>
    </div>
  );
};

export default AccountPage;
