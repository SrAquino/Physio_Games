import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "../assets/config/firebase";

const auth = getAuth(app);

export const createUser = async (email, senha) => {

    await createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...s
            return user
        })
      
}

export const loginUser = (email, senha) => {

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            return user
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Erro '+errorCode+': '+errorMessage);
        });
}

