import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4GNb6oqvKIbgW5anb8ytcI8l8ELfC8gI",
  authDomain: "todo-list-b749c.firebaseapp.com",
  projectId: "todo-list-b749c",
  storageBucket: "todo-list-b749c.firebasestorage.app",
  messagingSenderId: "73702577755",
  appId: "1:73702577755:web:bea9ce914ff7ea7b5b117e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
