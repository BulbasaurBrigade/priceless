import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  refFromURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyClMCl_RO_ziIwGDQZRrjEBmP5_gFUcxyA",
  authDomain: "priceless-f31d8.firebaseapp.com",
  projectId: "priceless-f31d8",
  storageBucket: "priceless-f31d8.appspot.com",
  messagingSenderId: "709712833656",
  appId: "1:709712833656:web:d1698ad86f7706d56b118d",
  measurementId: "G-SK4XX9KCE9",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);
const storageRef = ref(storage);

const postImagesRef = ref(storage, "postImages");
const userImagesRef = ref(storage, "userImages");

// const path = postImagesRef.fullPath;
// const name = postImagesRef.name;
// console.log("path", path);
// console.log("name", name);
export {
  postImagesRef,
  userImagesRef,
  uploadBytes,
  ref,
  storage,
  getDownloadURL,
  deleteObject,
  refFromURL,
};
