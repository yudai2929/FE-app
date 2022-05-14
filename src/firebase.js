import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyADQfpkGq4XxH2DNFH52VDIKDs474wR8bo",
    authDomain: "quiz-app-c9757.firebaseapp.com",
    projectId: "quiz-app-c9757",
    storageBucket: "quiz-app-c9757.appspot.com",
    messagingSenderId: "240141814046",
    appId: "1:240141814046:web:514a959c703594e9f0a10f"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db