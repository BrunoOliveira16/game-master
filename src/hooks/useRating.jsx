import { useNavigate } from 'react-router-dom';
import { useAuthentication } from 'hooks/useAuthentication';
import { useAppContext } from 'context/useAppContext'

const useRating = (item) => {
    const navigate = useNavigate();
    const { auth } = useAuthentication();
    const user = auth.currentUser;
    const { ratings, setRatings } = useAppContext();
    const rating = ratings[item.id] || 0;

    const handleRate = (newRating) => {
        if (!user) {
            alert('Você precisa fazer login para avaliar este item');
            navigate('/auth/login');
            return;
        }

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

    return { rating, handleRate };
};

export default useRating;