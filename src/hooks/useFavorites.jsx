import { db } from '../firebase/config';
import { collection, addDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from 'hooks/useAuthentication';

const useFavorites = (setFavorites) => {
    const navigate = useNavigate();
    const { auth } = useAuthentication();
    const user = auth.currentUser;

    const handleAddFavorite = async (item) => {
        if (!user) {
            alert('Você precisa fazer login para marcar este item como favorito');
            navigate('/auth/login');
            return;
        }
        
        try {
            const favoritesRef = collection(db, 'users', user.uid, 'favorites');
            await addDoc(favoritesRef, item);
            setFavorites((prevFav) => [...prevFav, item]);
        } catch(error) {
            console.log(error);
        }
    };

    const handleRemoveFavorite = async (item) => {
        if (!user) {
            alert('Você precisa fazer login para marcar este item como favorito');
            navigate('/auth/login');
            return;
        }
        
        try {
            const favoritesRef = collection(db, 'users', user.uid, 'favorites');
            const q = query(favoritesRef, where('id', '==', item.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                deleteDoc(doc.ref);
            });
            setFavorites((prev) => prev.filter((favorite) => favorite.id !== item.id));
        } catch (error) {
            console.log(error);
        }
    };

    return {
        handleAddFavorite,
        handleRemoveFavorite
    };
};

export default useFavorites;