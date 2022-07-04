import ProgressBar from "./ProgressBar/ProgressBar";
import SidebarOptions from "./SidebarOptions/SidebarOptions";
import ProfileView from "./ProfileView/ProfileView";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../Config/firebaseConfig";
import { useAuth } from "../../Hooks/useAuth";
import { useState } from 'react';

//takes in name, level, expMax and expVal
const Sidebar = (props) => {
  const { user } = useAuth();
  const [values, setValues] = useState(props.values);

  if (Object.keys(values).length === 0) {
    const getStartInfo = async () => {
      const Data = await getDoc(doc(db, "users", user.uid));
      setValues({ name: (Data.data().firstName + " " + Data.data().lastName), expVal: Data.data().points, expMax: 300 });
    };
    getStartInfo();
  }
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