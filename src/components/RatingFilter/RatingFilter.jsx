import { useState } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { useAuthentication } from 'hooks/useAuthentication';

const RatingFilter = ({ setRatingFilter, setSortOrder }) => {
  const [rating, setRating] = useState(0);
  const [sortOrder, setSortOrderState] = useState('desc');
  const { auth } = useAuthentication();
  const user = auth.currentUser;

  if (!user) {
        return null;
  }

  // Filtro especifico por classificação
  const handleRatingClick = (newRating) => {
    if (rating === newRating) {
      setRatingFilter(null);
      setRating(0);
    } else {
      setRatingFilter(newRating);
      setRating(newRating);
    }
  };

  // Filtro classificação decrescente/ascendente
  const handleSortClick = () => {
    if (sortOrder === 'desc') {
      setSortOrder('asc');
      setSortOrderState('asc');
    } else {
      setSortOrder('desc');
      setSortOrderState('desc');
    }
  };

  return (
    <aside className='list'>
      <div className='list-item'>
        {[1, 2, 3, 4].map((star) => (
          <BsStarFill
            key={star}
            onClick={() => handleRatingClick(star)}
            className={rating >= star ? 'highlight' : ''}
          />
        ))}
      </div>
      <div className='list-item mt-1 cursor' onClick={handleSortClick}>
        Ordenar por avaliação ({sortOrder === 'desc' ? 'decrescente' : 'crescente'})
      </div>
    </aside>
  );
};

export default RatingFilter;
