import { useEffect, useState } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { RiSortDesc, RiSortAsc } from 'react-icons/ri';
import { useAuthentication } from 'hooks/useAuthentication';
import './ratingFilter.scss';

const RatingFilter = ({ setRatingFilter, setSortOrder }) => {
  const [rating, setRating] = useState(0);
  const [sortOrder, setSortOrderState] = useState('desc');
  const { auth } = useAuthentication();
  const user = auth.currentUser;

  //Limpa filtro quando deslogar
  useEffect(() => {
    if(!user) {
      setRating(0);
      setRatingFilter(null);
    }
  }, [setRatingFilter, user]);

  //Filtro especifico por valor de classificação
  const handleRatingClick = (newRating) => {
    if (rating === newRating) {
      setRatingFilter(null);
      setRating(0);
    } else {
      setRatingFilter(newRating);
      setRating(newRating);
    }
  };

  //Filtro especifico por classificação decrescente e crescente
  const handleSortClick = () => {
    if (sortOrder === 'desc') {
      setSortOrder('asc');
      setSortOrderState('asc');
    } else {
      setSortOrder('desc');
      setSortOrderState('desc');
    }
  };

  // Não exibe a barra quando deslogado
  if (!user) {
    return null;
  }

  return (
    <aside className='rating'>
      <div className='rating-list'>
        {[1, 2, 3, 4].map((star) => (
          <BsStarFill
            key={star}
            onClick={() => handleRatingClick(star)}
            className={rating >= star ? 'highlight' : ''}
          />
        ))}
      </div>
      <div className='rating-list' onClick={handleSortClick}>
        Ordenar {sortOrder === 'desc' ? <RiSortDesc /> : <RiSortAsc /> }
      </div>
    </aside>
  );
};

export default RatingFilter;
