import { useState } from 'react';
import { BsFillHeartFill }  from 'react-icons/bs';

// Styles
import './card.scss';

const Card = ({ title, thumbnailUrl, onAddFavorite, onRemoveFavorite, isFavorite: isFavorited }) => {
  const [ isFavorite, setIsFavorite ] = useState(isFavorited);

  const handleFavoritClick = () => {
    setIsFavorite(!isFavorite)
    if(isFavorite) {
      onRemoveFavorite();
    } else {
      onAddFavorite();
    }
  }

  return (
    <div className='card'>
        <img src={thumbnailUrl} alt={title} className='card-img'/>
        <div className='card-title'>
          <h2 className='card-title--name'>{title}</h2>
          <BsFillHeartFill 
            onClick={handleFavoritClick}
            className={isFavorite ? 'isFavorite' : ''}
          />
        </div>
    </div>
  );
};

export default Card;