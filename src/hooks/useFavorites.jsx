import { db } from '../firebase/config';
import { collection, addDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuthentication } from 'hooks/useAuthentication';
import { useState } from 'react';

const useFavorites = (setFavorites) => {
    const { auth } = useAuthentication();
    const user = auth.currentUser;
    const [ error, setError ] = useState(null);

    const handleAddFavorite = async (item) => {
        if (!user) return;
        
        try {
            const favoritesRef = collection(db, 'users', user.uid, 'favorites');
            await addDoc(favoritesRef, item);
            setFavorites((prevFav) => [...prevFav, item]);
            return true
        } catch(error) {
            setError('Ocorreu um erro ao adicionar o item aos favoritos. Por favor, tente novamente.');
            return false;
        }
    };

    const handleRemoveFavorite = async (item) => {
        if (!user) return;
        
        try {
            const favoritesRef = collection(db, 'users', user.uid, 'favorites');
            const q = query(favoritesRef, where('id', '==', item.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref);
            });
            setFavorites((prev) => prev.filter((favorite) => favorite.id !== item.id));
            return true
        } catch (error) {
            setError('Ocorreu um erro ao remover o item dos favoritos. Por favor, tente novamente.');
            return false;
        }
    };

    return {
        handleAddFavorite,
        handleRemoveFavorite,
        error
    };
};

export default useFavorites;