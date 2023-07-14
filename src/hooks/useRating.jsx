import { db } from '../firebase/config';
import { addDoc, collection, deleteDoc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { useAuthentication } from 'hooks/useAuthentication';
import { useAppContext } from 'context/useAppContext'

const useRating = () => {
    const { auth } = useAuthentication();
    const { setRatings } = useAppContext();
    const user = auth.currentUser;
    

    const handleAddRatings = async (item) => {
        if (!user) return;

        try {
            const ratingsRef = collection(db, 'users', user.uid, 'ratings');
            const q = query(ratingsRef, where('id', '==', item.id));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.empty){
                await addDoc(ratingsRef, item);
            } else {
                querySnapshot.forEach((doc) => {
                    updateDoc(doc.ref, item);
                });
            }
            setRatings((prevRat) => ({ ...prevRat, [item.id]: item.rating }));
        } catch(error) {
            console.log(error);
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
            setRatings((prev) => {
                const newRatings = { ...prev };
                delete newRatings[item.id];
                return newRatings;
            });
        } catch (error) {
            console.log(error);
        }
    }

    return { 
        handleAddRatings, 
        handleRemoveRatings 
    };
};

export default useRating;