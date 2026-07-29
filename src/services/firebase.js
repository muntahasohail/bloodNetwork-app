import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyC_kAKI69HWwxkgLzQWJvrLcLPKghSkGhg",
  authDomain: "bloodapp-439f0.firebaseapp.com",
  projectId: "bloodapp-439f0",
  storageBucket: "bloodapp-439f0.firebasestorage.app",
  messagingSenderId: "832207100720",
  appId: "1:832207100720:web:16aa2a4daaf327212806f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, db, auth};