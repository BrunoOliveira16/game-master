import { db } from '../firebase/config';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(null);
    const auth = getAuth();

    // cleanup - Tratamento de memory leak
    const [ cancelled, setCancelled ] = useState(false);
    function checkIfIsCancelled() {
        if(cancelled) {
            return;
        }
    }

    // Registro de usuário
    const createUser = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);
        
        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false);
            return user;

        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);
            let systemErrorMessage;

            if(error.message.includes("weak-password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
            } else if (error.message.includes("email-already-in-use")) {
                systemErrorMessage = "E-mail já cadastrado.";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
            }

            setLoading(false);
            setError(systemErrorMessage);
            return false
        }
    };
    
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { 
        auth, 
        createUser, 
        error, 
        loading
    };
};