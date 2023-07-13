import { useContext, useEffect, useState } from 'react';
import { BsFillHeartFill, BsStarFill }  from 'react-icons/bs';
import { motion } from 'framer-motion';
// Custom Hooks
import useFavorites from 'hooks/useFavorites';
import useRating from 'hooks/useRating';
// Context
import { useAppContext } from 'context/useAppContext';
import { AuthContext } from 'context/AuthContext';
// Styles
import './card.scss';
// Components
import Modal from 'components/Modal/Modal';

const Card = ({ title, thumbnailUrl, item, developer }) => {
  const { user } = useContext(AuthContext)
  const { favorites, setFavorites, ratings } = useAppContext();
  const isFavorited = favorites.some((favorite) => favorite.id === item.id);
  const [ isFavorite, setIsFavorite ] = useState(isFavorited);
  const { handleAddFavorite, handleRemoveFavorite }  = useFavorites(setFavorites);
  const [ isRating, setIsRating ] = useState(ratings[item.id] || 0);
  const { handleAddRatings, handleRemoveRatings } = useRating(item);
  const [ highlightStar, setHighlightStar ] = useState(-1);
  const [ showModal, setShowModal ] = useState(false);
  const [ textMessage, setTextMessage ] = useState('');

  useEffect(() => {
    if(!user) {
      setIsFavorite(false);
      setIsRating(0);
    }
  }, [user])

  const handleFavoritClick = () => {
    if (!user) {
      setShowModal(true);
      setTextMessage("adicionar como favorito")
      return;
    }

    setIsFavorite(!isFavorite)
    if(isFavorite) {
      handleRemoveFavorite(item);
    } else {
      handleAddFavorite(item);
    }
  }

  const handleRatingClick = (newRating) => {
    if (!user) {
      setShowModal(true);
      setTextMessage("avaliar o jogo")
      return;
    }

    if(isRating === newRating) {
      handleRemoveRatings(item);
      setIsRating(0)
    } else {
      handleAddRatings({...item, rating: newRating});
      setIsRating(newRating)
    }
  }

  const handleMouseEnter = (index) => {
    setHighlightStar(index)
  }
  const handleMouseLeave = () => {
    setHighlightStar(-1);
  }

  return (
    <>
      <Modal 
        showModal={showModal}
        setShowModal={setShowModal} 
        textMessage={textMessage}
      />
      <motion.div
        layout 
        animate={{ opacity: 1.5, scale: 1 }} 
        initial={{ opacity: 1, scale: 0.8 }} 
        exit={{ opacity: 1, scale: 0.8 }}
        transition={{duration: .6}} 
        className='card'
      >
        <div className='card-wrapper'>
          <img src={thumbnailUrl} alt={title} className='card-wrapper-img'/>
        </div> 
        <div className='card-content'>
          <h2 className='card-content-title'>{title}</h2>
          <p className='card-content-dev'>Developer: <span>{developer}</span></p>
          <div className='card-content-rating'>
            <BsFillHeartFill 
              onClick={ handleFavoritClick }
              className={isFavorite ? 'isFavorite' : ''}
            />
            <div onMouseLeave={handleMouseLeave}>
              {[1, 2, 3, 4].map((star, index) => (
                <BsStarFill 
                  key={star}
                  onClick={ () => handleRatingClick(star) }
                  onMouseEnter={() => handleMouseEnter(index)}
                  className={(isRating >= star || highlightStar >= index) ? 'highlight' : ''}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Card;