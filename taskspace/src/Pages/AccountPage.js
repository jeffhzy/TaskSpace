import "./AccountPage.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Header";
import ProfilePicUpload from "../Components/Account/ProfilePicUpload/ProfilePicUpload";


const AccountPage = () => {
    return (
        <>
            <Header />
            <div className="pageOrientation">
                <Sidebar className="header-sidebar" values={{}} />
                <div className="mainPart">
                    <ProfilePicUpload />
                </div>
            </div>
        </>

    );
};

export default AccountPage;
