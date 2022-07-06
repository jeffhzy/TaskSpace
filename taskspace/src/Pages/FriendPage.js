import "./FriendPage.css";
import RequestList from "../Components/Friends/FriendRequest/RequestList";
import FriendList from "../Components/Friends/FriendList/FriendList";

const FriendPage = () => {
    return (
            <div className="friend-pageOrientation">
                <div className="friend-mainPart">
                    <RequestList />
                    <FriendList />
                </div>
            </div>
    );
};

export default FriendPage;