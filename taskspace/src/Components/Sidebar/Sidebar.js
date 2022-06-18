import ProgressBar from "./ProgressBar/ProgressBar";
import SidebarOptions from "./SidebarOptions/SidebarOptions";
import ProfileView from "./ProfileView/ProfileView";

//takes in name, level, expMax and expVal
const Sidebar = (props) => {
    const values = props.values;
    const exp = values.expVal + "/" + values.expMax;
    const progress = (values.expVal/values.expMax * 100).toFixed(1) + "%";
    return (
        <div className="sidebar-container">
          <ProfileView  name={values.name} level={values.level} exp={exp}></ProfileView>
          <ProgressBar progress={progress}></ProgressBar>
        <SidebarOptions></SidebarOptions></div>
    );
  };
  
  export default Sidebar;