import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/firebaseConfig";

const contentData = [];
const email = [];

const getContentData = () => {
  return new Promise((resolve) => {
    getDocs(collection(db, "users")).then((docs) => {
      docs.forEach((doc) => {
        if (email.indexOf(doc.data().email) === -1) {
          contentData.push(doc);
          email.push(doc.data().email);
        }
      });
    });
    resolve(contentData);
  });
};


export default getContentData;
