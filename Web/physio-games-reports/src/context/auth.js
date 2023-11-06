import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser, sendPasswordResetEmail } from "firebase/auth";
import app from "../assets/config/firebase.js";
import { collection, setDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { createContext, useState, useEffect } from "react";

import db from "../assets/config/db.js"

export const AuthContext = createContext();

const auth = getAuth(app);

export const createInstituition = async (email, senha, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);

    // Criação do documento da instituição no Firestore
    const instituitionRef = doc(collection(db, 'Instituitions'), email);

    await setDoc(instituitionRef, {
        email,
        displayName,
        // role: '... se necessário ...',
    });

    return userCredential.user.uid; // ou outra identificação única
}

export const createUser = async (email, senha) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    return userCredential.user.uid;
}

export const deleteFisio = async (userData) => {
    const authUser = await getAuth().getUserByEmail(userData.email);
    if (authUser) {
        await deleteUser(authUser);
    }
}




export const AuthProvider = ({ children }) => {
    //const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginUser = async (email, senha, inst) => {

        const instituitionRef = doc(db, "Instituitions", inst);
        const fisiosQuery = query(collection(instituitionRef, "Fisios"), where("email", "==", email));
        const fisiosSnapshot = await getDocs(fisiosQuery);

        if (!fisiosSnapshot.empty) {

            const auth = getAuth();
            return await signInWithEmailAndPassword(auth, email, senha)
                .then((userCredential) => {
                    // Signed in 
                    const loged = userCredential.user;
                    localStorage.setItem("user", JSON.stringify(loged));
                    localStorage.setItem("inst", JSON.stringify(inst));

                    setUser(loged);
                    // ...
                    return user
                })
        } else {
            throw new Error('Usuário não encontrado');
        }
    }

    const loginInst = async (email, senha) => {

        const auth = getAuth();
        return await signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                // Signed in 
                const loged = userCredential.user;
                localStorage.setItem("user", JSON.stringify(loged));

                setUser(loged);
                return user
            })

    }

    const logoutUser = async () => {
        await signOut(auth);
        localStorage.removeItem("user");
        localStorage.removeItem("insts");


        console.log('Usuário desconectado com sucesso.');
    }

    const recPass = async (email) => {
        await sendPasswordResetEmail(auth, email);
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
            logoutUser,
            loginInst,
            recPass
        }}>
            {children}
        </AuthContext.Provider>
    )
}

