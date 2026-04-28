import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-zmw_CrpyXl35sgYYnR-kN1j6ult8xzA",
  authDomain: "hearthubsouls.firebaseapp.com",
  projectId: "hearthubsouls",
  storageBucket: "hearthubsouls.firebasestorage.app",
  messagingSenderId: "934975909568",
  appId: "1:934975909568:web:fac75bdae9f24bd71f8725",
  measurementId: "G-08FZKWWCFT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
