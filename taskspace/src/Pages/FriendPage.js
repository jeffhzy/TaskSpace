import "./FriendPage.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Header";
import RequestList from "../Components/Friends/FriendRequest/RequestList";
import FriendList from "../Components/Friends/FriendList/FriendList";

const FriendPage = () => {
    return (
        <>
            <Header />
            <div className="friend-pageOrientation">
                <Sidebar values={{}} />
                <div className="friend-mainPart">
                    <RequestList />
                    <FriendList />
                </div>
            </div>
        </>

    );
};

export default FriendPage;