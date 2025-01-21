// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey:'AIzaSyCwnv9o-k2A9oPl6mJHT4zDNlFLHj2IzCE',
  authDomain: 'vision-board-app-f8c89.firebaseapp.com',
  projectId: 'vision-board-app-f8c89',
  storageBucket: 'vision-board-app-f8c89.firebasestorage.app',
  messagingSenderId: '690592244771',
  appId: '1:690592244771:web:027c3699edbff718afbd96',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
