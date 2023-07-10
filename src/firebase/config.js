import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1HzJQUwkzokT-UoYJbjziOkh6Yo8_ZQI",
  authDomain: "game-master-98cb1.firebaseapp.com",
  projectId: "game-master-98cb1",
  storageBucket: "game-master-98cb1.appspot.com",
  messagingSenderId: "542662079753",
  appId: "1:542662079753:web:373ca89c3724659a57cfd8"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };