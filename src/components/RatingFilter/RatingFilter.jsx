import { useState } from 'react';
import { BsStarFill } from 'react-icons/bs';

const RatingFilter = ({ setRatingFilter, setSortOrder }) => {
  const [rating, setRating] = useState(0);
  const [sortOrder, setSortOrderState] = useState('desc');

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
            className={rating >= star ? 'isRated' : ''}
          />
        ))}
      </div>
      <div className='list-item mt-1' onClick={handleSortClick}>
        Ordenar por avaliação ({sortOrder === 'desc' ? 'decrescente' : 'crescente'})
      </div>
    </aside>
  );
};

export default RatingFilter;
