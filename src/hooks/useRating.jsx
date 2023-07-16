import { useState } from 'react';
import { db } from '../firebase/config';
import { addDoc, collection, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuthentication } from 'hooks/useAuthentication';
import { useAppContext } from 'context/useAppContext'

const useRating = () => {
    const { auth } = useAuthentication();
    const { setRatings } = useAppContext();
    const user = auth.currentUser;
    const [ error, setError ] = useState(null);

    const handleAddRatings = async (item) => {
        if (!user) return;

        try {
            const ratingsRef = collection(db, 'users', user.uid, 'ratings');
            const q = query(ratingsRef, where('id', '==', item.id));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
              await addDoc(ratingsRef, item);
            } else {
              querySnapshot.forEach((doc) => {
                updateDoc(doc.ref, item);
              });
            }
            setRatings((prevRat) => [
              ...prevRat.filter((rating) => rating.id !== item.id),
              item,
            ]);
            return true;
          } catch(error) {
            setError('Ocorreu um erro ao adicionar a avaliação. Por favor, tente novamente.');
            return false;
        }
    };

    const handleRemoveRatings = async(item) => {
        if (!user) return;

        try {
            const ratingsRef = collection(db, 'users', user.uid, 'ratings');
            const q = query(ratingsRef, where('id', '==', item.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              deleteDoc(doc.ref);
            });
            setRatings((prevRat) =>
              prevRat.filter((rating) => rating.id !== item.id)
            );
            return true;
          } catch (error) {
            setError('Ocorreu um erro ao remover a avaliação. Por favor, tente novamente.');
            return false;
        }
    }

    return { 
        handleAddRatings, 
        handleRemoveRatings,
        error 
    };
};

export default useRating;