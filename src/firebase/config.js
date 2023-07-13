import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKm_eWVwEpHXlnlT0vF4DpB7RZl230388",
  authDomain: "game-master-681ca.firebaseapp.com",
  projectId: "game-master-681ca",
  storageBucket: "game-master-681ca.appspot.com",
  messagingSenderId: "369851307929",
  appId: "1:369851307929:web:45bc86602fa2b4069fa508"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };