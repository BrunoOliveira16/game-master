import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [search, setSearch] = useState('');
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [ favorites, setFavorites ] = useState([]);
    const [ ratings, setRatings ] = useState({});

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