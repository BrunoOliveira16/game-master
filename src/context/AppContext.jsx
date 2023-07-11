import { createContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { useAuthentication } from 'hooks/useAuthentication';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [ search, setSearch ] = useState('');
    const [ genres, setGenres ] = useState([]);
    const [ selectedGenre, setSelectedGenre ] = useState(null);
    const [ favorites, setFavorites ] = useState([]);
    const [ ratings, setRatings ] = useState({});
    const { auth } = useAuthentication();
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
          const fetchFavorites = async () => {
            const favoritesRef = collection(db, 'users', user.uid, 'favorites');
            const querySnapshot = await getDocs(favoritesRef);
            const favoritesData = querySnapshot.docs.map((doc) => doc.data());
            //console.log(favoritesData);
            setFavorites(favoritesData);
          };
          fetchFavorites();
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