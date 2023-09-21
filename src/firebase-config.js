import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAXIlFFob9g2sk7eLNdyjRvWLmjAsg4TvI",
    authDomain: "real-time-chat-applicati-cbbb8.firebaseapp.com",
    projectId: "real-time-chat-applicati-cbbb8",
    storageBucket: "real-time-chat-applicati-cbbb8.appspot.com",
    messagingSenderId: "142754338207",
    appId: "1:142754338207:web:916c44881efa44b25119aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);