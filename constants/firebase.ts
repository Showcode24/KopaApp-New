import { initializeApp } from "firebase/app"; 
import { getAuth, GoogleAuthProvider } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCQ-rlEJGzXgfcpnH3vfmi1i8V_v2AUa1A",
  authDomain: "kopa360-db3ad.firebaseapp.com",
  projectId: "kopa360-db3ad",
  storageBucket: "kopa360-db3ad.appspot.com",
  messagingSenderId: "905234000073",
  appId: "1:905234000073:web:b60d20360327b2caed4c6a",
};

const app = initializeApp(firebaseConfig);

console.log("Firebase app initialized successfully.");

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export default app;
