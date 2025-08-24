import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAu4MHKK6QJXnAW7Fd--VWWwuLpsyxaKOE",
  authDomain: "resturant-8e594.firebaseapp.com",
  projectId: "resturant-8e594",
  storageBucket: "resturant-8e594.firebasestorage.app",
  messagingSenderId: "323859498418",
  appId: "1:323859498418:web:1d040f3ddc596c356450ab"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);