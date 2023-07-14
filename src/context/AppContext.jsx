import { createContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useAuthentication } from 'hooks/useAuthentication';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [ search, setSearch ] = useState('');
    const [ genres, setGenres ] = useState([]);
    const [ selectedGenre, setSelectedGenre ] = useState(null);
    const [ favorites, setFavorites ] = useState([]);
    const [ ratings, setRatings ] = useState([]);
    const { auth } = useAuthentication();
    const user = auth.currentUser;

    //Favoritos
    useEffect(() => {
        if(user) {
          const fetchFavorites = async () => {
            const favoritesRef = collection(db, 'users', user.uid, 'favorites');
            const querySnapshot = await getDocs(favoritesRef);
            const favoritesData = querySnapshot.docs.map((doc) => doc.data());
            setFavorites(favoritesData);
          };
          fetchFavorites();
        }
      }, [user]);

      //Avaliações
      useEffect(() => {
        if (user) {
          const ratingsRef = collection(db, 'users', user.uid, 'ratings');
          const unsubscribe = onSnapshot(ratingsRef, (querySnapshot) => {
            const ratingsData = querySnapshot.docs.map((doc) => doc.data());
            setRatings(ratingsData);
          });
    
          return () => unsubscribe();
        }
      }, [user]);
    

    const value = {
        search,
        setSearch,
        selectedGenre,
        setSelectedGenre,
        genres,
        setGenres,
        favorites,
        setFavorites,
        ratings,
        setRatings
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};