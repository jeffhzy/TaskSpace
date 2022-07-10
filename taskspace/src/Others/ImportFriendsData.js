import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Config/firebaseConfig";

const friendsData = [];
const email = [];

const getFriendsData = (user) => {
  return new Promise((resolve) => {
    getDocs(
      query(collection(db, "users")),
      where("friends", "array-contains", user)
    ).then((docs) =>
      docs.forEach((doc) => {
        if (email.indexOf(doc.data().email) === -1) {
          friendsData.push(doc);
          email.push(doc.data().email);
        }
      })
    );
    resolve(friendsData);
  });
};

export default getFriendsData;
