import firebase from "firebase"


const firebaseConfig = {
  apiKey: "AIzaSyCOPI9vGzpddOhSs-W3voLoZhY8Ko7MtIs",
  authDomain: "netflix-ced62.firebaseapp.com",
  projectId: "netflix-ced62",
  storageBucket: "netflix-ced62.appspot.com",
  messagingSenderId: "166856980677",
  appId: "1:166856980677:web:050336d117128f176598ac",
  measurementId: "G-P37MBB9MLW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export default storage;