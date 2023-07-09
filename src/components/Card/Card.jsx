import { useState } from 'react';
import { BsFillHeartFill }  from 'react-icons/bs';

// Custom Hooks
import useFavorites from "hooks/useFavorites";

// Context
import { useAppContext } from 'context/useAppContext';

// Styles
import './card.scss';

const Card = ({ title, thumbnailUrl, item }) => {
  const { favorites, setFavorites } = useAppContext();
  const isFavorited = favorites.includes(item);
  const [ isFavorite, setIsFavorite ] = useState(isFavorited);
  const { handleAddFavorite, handleRemoveFavorite }  = useFavorites(setFavorites);


  const handleFavoritClick = () => {
    setIsFavorite(!isFavorite)
    if(isFavorite) {
      handleRemoveFavorite(item);
    } else {
      handleAddFavorite(item);
    }
  }

  console.log(favorites)

  return (
    <div className='card'>
        <img src={thumbnailUrl} alt={title} className='card-img'/>
        <div className='card-title'>
          <h2 className='card-title--name'>{title}</h2>
          <BsFillHeartFill 
            onClick={ handleFavoritClick }
            className={isFavorite ? 'isFavorite' : ''}
          />
        </div>
    </div>
  );
};

export default Card;