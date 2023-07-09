import { useAppContext } from 'context/useAppContext'

const useRating = (item) => {
    const { ratings, setRatings } = useAppContext();
    const rating = ratings[item.id] || 0;

    const handleRate = (newRating) => {
        if(newRating === rating) {
            setRatings((prevRat) => {
                const newRatings = { ...prevRat };
                delete newRatings[item.id];
                return newRatings;
            });
        } else {
            setRatings((prevRat) => ({
                ...prevRat,
                [item.id]: newRating,
            }));
        }
    };

    console.log(ratings)

    return { rating, handleRate };
};

export default useRating;