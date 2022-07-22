import { collection, getDocs } from "firebase/firestore";
import { db } from "../Config/firebaseConfig";

const contentData = [];
const email = [];
const notesData = [];

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

const getNotesData = () => {
  return new Promise((resolve) => {
    getDocs(collection(db, "notes")).then((docs) => {
      docs.forEach((doc) => {
          notesData.push(doc);
      });
    });
    resolve(notesData);
  });
};


export { getContentData, getNotesData };
