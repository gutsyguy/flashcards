import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAtCYSzG-fHtPh8qIuXDu32SnHS_xK78Lo",
  authDomain: "flashcard-saas-f6eb6.firebaseapp.com",
  projectId: "flashcard-saas-f6eb6",
  storageBucket: "flashcard-saas-f6eb6.appspot.com",
  messagingSenderId: "325781306031",
  appId: "1:325781306031:web:1c0230d453fb523ff1b25a",
  measurementId: "G-L0V1SVC21C"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}
