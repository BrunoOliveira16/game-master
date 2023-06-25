import React from 'react';

// Styles
import './card.scss';

const Card = ({ title, thumbnailUrl }) => {
  
  return (
    <div className='card'>
        <img src={thumbnailUrl} alt={title} className='card-img'/>
        <h2 className='card-name'>{title}</h2>
    </div>
  );
};

export default Card;