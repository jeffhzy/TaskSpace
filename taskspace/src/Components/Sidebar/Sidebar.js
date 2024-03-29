import ProgressBar from "./ProgressBar/ProgressBar";
import SidebarOptions from "./SidebarOptions/SidebarOptions";
import ProfileView from "./ProfileView/ProfileView";

//takes in name, level, expMax and expVal
const Sidebar = (props) => {
  const values = props.values;

  const exp = Math.floor(values.expVal % values.expMax) + "/" + values.expMax;
  const level = Math.floor((values.expVal / values.expMax) + 1);
  const progress = Math.floor((values.expVal % values.expMax) / values.expMax * 100) + "%";

  return (
    <div className="sidebar-container">
      <ProfileView name={values.name} level={level} exp={exp}></ProfileView>
      <ProgressBar progress={progress}></ProgressBar>
      <SidebarOptions></SidebarOptions></div>
  );
};

export default Sidebar;