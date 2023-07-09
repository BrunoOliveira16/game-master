const useFavorites = ( setFavorites) => {

    const handleAddFavorite = (item) => {
        setFavorites((prevFav) => [...prevFav, item]);
    };

    const handleRemoveFavorite = (item) => {
        setFavorites((prevFav) => prevFav.filter((fav) => fav !== item));
    };

    return {
        handleAddFavorite,
        handleRemoveFavorite
    };
};

export default useFavorites;