import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAI5VQnpLAJu1-zhlPth7XlYnjlrdjA1Ag",
    authDomain: "physiogamesrelatorios.firebaseapp.com",
    databaseURL: "https://physiogamesrelatorios-default-rtdb.firebaseio.com",
    projectId: "physiogamesrelatorios",
    storageBucket: "physiogamesrelatorios.appspot.com",
    messagingSenderId: "1092665542956",
    appId: "1:1092665542956:web:b814f6e3806fd75a5b0489"
  };

  const app = initializeApp(firebaseConfig);

  export default app;