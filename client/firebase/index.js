import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

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

//Grab storage
const storage = getStorage(firebaseApp);

//create references to postImages and userImages folder in storage
const postImagesRef = ref(storage, "postImages");
const userImagesRef = ref(storage, "userImages");

export { postImagesRef, userImagesRef, storage };
