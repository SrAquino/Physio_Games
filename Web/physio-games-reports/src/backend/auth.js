import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import app from "../assets/config/firebase";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const auth = getAuth(app);
const user = auth.currentUser;

onAuthStateChanged(auth, () => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
});

export const createUser = async (email, senha, displayName) => {

    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;


}



export const AuthProvider = ({ children }) => {
    //const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginUser = async (email, senha) => {

        const auth = getAuth();
        return await signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                localStorage.setItem("user", JSON.stringify(user));
                // ...
                return user
            })
    }
    
    const logoutUser = async () => {
        await signOut(auth);
        localStorage.removeItem("user");
        console.log('Usuário desconectado com sucesso.');
    }

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');
        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser))
        }
        setLoading(false);
    }, [])

    return (
        <AuthContext.Provider value={{
            authenticated: !!user,
            user,
            loading,
            loginUser,
            logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

