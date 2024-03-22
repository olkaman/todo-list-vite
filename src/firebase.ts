// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyClvW1g4MTT80obR578xhTi_vVcvcaZfR4',
  authDomain: 'todo-list-3a938.firebaseapp.com',
  projectId: 'todo-list-3a938',
  storageBucket: 'todo-list-3a938.appspot.com',
  messagingSenderId: '157983241781',
  appId: '1:157983241781:web:99044f9fdfdd3efc3de37c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
