import { useState } from "react";

const useFavorites = () => {
    const [ favorites, setFavorites ] = useState([]);

    const handleAddFavorite = (item) => {
        setFavorites((prevFav) => [...prevFav, item]);
    };

    const handleRemoveFavorite = (item) => {
        setFavorites((prevFav) => prevFav.filter((fav) => fav !== item));
    };

    return {
        favorites,
        handleAddFavorite,
        handleRemoveFavorite
    };
};

export default useFavorites;