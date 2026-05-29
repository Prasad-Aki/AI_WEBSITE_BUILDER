// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "genwebai-8e9ce.firebaseapp.com",
    projectId: "genwebai-8e9ce",
    storageBucket: "genwebai-8e9ce.firebasestorage.app",
    messagingSenderId: "870154494963",
    appId: "1:870154494963:web:3de9a0827f6ab66c67e886"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}