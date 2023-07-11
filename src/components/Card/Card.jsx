import { useState } from 'react';
import { BsFillHeartFill, BsStarFill }  from 'react-icons/bs';

// Custom Hooks
import useFavorites from 'hooks/useFavorites';
import useRating from 'hooks/useRating';

// Context
import { useAppContext } from 'context/useAppContext';

// Styles
import './card.scss';

const Card = ({ title, thumbnailUrl, item, developer }) => {
  const { favorites, setFavorites } = useAppContext();
  const isFavorited = favorites.some((favorite) => favorite.id === item.id);
  const [ isFavorite, setIsFavorite ] = useState(isFavorited);
  const { handleAddFavorite, handleRemoveFavorite }  = useFavorites(setFavorites);
  const { rating, handleRate } = useRating(item);


  const handleFavoritClick = () => {
    setIsFavorite(!isFavorite)
    if(isFavorite) {
      handleRemoveFavorite(item);
    } else {
      handleAddFavorite(item);
    }
  }

  return (
    <div className='card'>
      <div className='card-wrapper'>
        <img src={thumbnailUrl} alt={title} className='card-wrapper-img'/>
      </div> 
      <div className='card-content'>
        <h2 className='card-content-title'>{title}</h2>
        <p>{developer}</p>
        <div className='card-content-rating'>
          <BsFillHeartFill 
            onClick={ handleFavoritClick }
            className={isFavorite ? 'isFavorite' : ''}
          />
          <div>
            {[1, 2, 3, 4].map((star) => (
              <BsStarFill 
                key={star}
                onClick={() => handleRate(star)}
                className={rating >= star ? 'isRated' : ''}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;