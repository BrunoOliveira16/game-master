import { useState } from 'react';
import { motion } from 'framer-motion';
import { BsFillHeartFill, BsStarFill } from 'react-icons/bs';
import useCard from 'hooks/useCard';
import Modal from 'components/Modal/Modal';
import './card.scss';

const Card = ({ title, thumbnailUrl, item, developer, profileUrl }) => {
  const [highlightStar, setHighlightStar] = useState(-1);
  const {
    isFavorite,
    isRating,
    showModal,
    setShowModal,
    textMessage,
    handleFavoritClick,
    handleRatingClick,
  } = useCard(item);

  // Funções para lidar com a animação das estrelas 
  const handleMouseEnter = (index) => {
    setHighlightStar(index);
  };
  const handleMouseLeave = () => {
    setHighlightStar(-1);
  };

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
        transition={{ duration: 0.6 }}
        className='card'
      >
        <div className='card-wrapper'>
          <img src={thumbnailUrl} alt={title} className='card-wrapper-img' />
        </div>
        <div className='card-content'>
          <h2 className='card-content-title'>{title}</h2>
          <p className='card-content-dev'>
            Developer: <span>{developer}</span>
          </p>
          <a className='card-content-link' href={profileUrl} target='__blank'>Saber mais</a>
          <hr />
          <div className='card-content-rating'>
            <BsFillHeartFill
              onClick={handleFavoritClick}
              className={isFavorite ? 'isFavorite' : ''}
            />
            <div onMouseLeave={handleMouseLeave}>
              {[1, 2, 3, 4].map((star, index) => (
                <BsStarFill
                  key={star}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  className={
                    isRating >= star || highlightStar >= index
                      ? 'highlight'
                      : ''
                  }
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
