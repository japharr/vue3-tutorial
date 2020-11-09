import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB6Bp5g0ELnmO3lGmrt_Fgi6L40LgdWZcI",
  authDomain: "vue-full-course-93cca.firebaseapp.com",
  databaseURL: "https://vue-full-course-93cca.firebaseio.com",
  projectId: "vue-full-course-93cca",
  storageBucket: "vue-full-course-93cca.appspot.com",
  messagingSenderId: "465957676951",
  appId: "1:465957676951:web:24696ee76172c4828246d2",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
export const chatsRef = db.ref("chats");

export default firebase;
