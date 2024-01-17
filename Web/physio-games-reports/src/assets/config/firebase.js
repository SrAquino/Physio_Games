import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA-MwMEMf5cnnXCE6FPnjGvA8isKA1RpYc",
  authDomain: "physio-games-30d75.firebaseapp.com",
  //databaseURL: "",
  projectId: "physio-games-30d75",
  storageBucket: "physio-games-30d75.appspot.com",
  messagingSenderId: "1096339797398",
  appId: "1:1096339797398:web:fecc22c7aba981bffe59b7"
};


  const app = initializeApp(firebaseConfig);

  export default app;